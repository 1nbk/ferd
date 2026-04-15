import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, bookingPendingTemplate } from "@/lib/email";

interface BookingRequest {
  roomId?: string;
  carId?: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  guest: {
    email: string;
    name: string;
    phone: string;
    idDocumentUrl?: string;
    idNumber?: string;
    idVerified?: boolean;
  };
}

export async function POST(req: Request) {
  try {
    const { roomId, carId, checkIn, checkOut, totalPrice, guest }: BookingRequest = await req.json();

    if ((!roomId && !carId) || !checkIn || !checkOut || !guest.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 0. Recalculate Price on Server (Security Hardening)
    let serverCalculatedPrice = 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

    if (roomId) {
      const room = await prisma.room.findUnique({ where: { id: roomId } });
      if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });
      serverCalculatedPrice = room.pricePerNight * diffDays;
    } else if (carId) {
      const car = await prisma.car.findUnique({ where: { id: carId } });
      if (!car) return NextResponse.json({ error: "Car not found" }, { status: 404 });
      serverCalculatedPrice = car.pricePerDay * diffDays;
    }

    // Verify if client sent a suspiciously different price
    if (Math.abs(totalPrice - serverCalculatedPrice) > 1) {
      console.warn(`Price mismatch detected for ${guest.email}: Client sent ${totalPrice}, Server calced ${serverCalculatedPrice}`);
      // We'll enforce the server price for security
    }

    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    // 0. Prevent Double Booking
    const overlapping = await prisma.booking.findFirst({
      where: {
        roomId: roomId || undefined,
        carId: carId || undefined,
        OR: [
          { status: "CONFIRMED" },
          { 
            status: "PENDING",
            createdAt: { gte: thirtyMinutesAgo }
          }
        ],
        AND: [
          { checkIn: { lt: end } },
          { checkOut: { gt: start } }
        ]
      }
    });

    if (overlapping) {
      return NextResponse.json({ error: "These dates are no longer available. Please select different dates." }, { status: 409 });
    }

    // 1. Create or Find Guest
    const guestRecord = await prisma.guest.upsert({
      where: { email: guest.email },
      update: { 
        name: guest.name, 
        phone: guest.phone,
        ...(guest.idDocumentUrl && { idDocumentUrl: guest.idDocumentUrl }),
        ...(guest.idNumber && { idNumber: guest.idNumber }),
        ...(guest.idVerified && { idVerified: guest.idVerified })
      },
      create: {
        email: guest.email,
        name: guest.name,
        phone: guest.phone,
        idDocumentUrl: guest.idDocumentUrl,
        idNumber: guest.idNumber,
        idVerified: guest.idVerified || false,
      },
    });

    // 2. Create Booking
    const booking = await prisma.booking.create({
      data: {
        roomId: roomId || null,
        carId: carId || null,
        guestId: guestRecord.id,
        checkIn: start,
        checkOut: end,
        totalPrice: serverCalculatedPrice,
        status: "PENDING",
      },
      include: {
        room: true,
        car: true,
      }
    });

    // 3. Send Pending Email (Fire and forget)
    sendEmail({
      to: guest.email,
      subject: "Reservation Pending - Ferd's Luxury Rentals",
      html: bookingPendingTemplate(booking, guest.name || guestRecord.name)
    }).catch(err => console.error("Async email error:", err));

    // 4. Initialize Paystack Transaction
    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: guest.email,
        amount: Math.round(serverCalculatedPrice * 100), // Paystack uses kobo/cents
        reference: `FERD_${booking.id}`,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/confirmation/${booking.id}`,
        metadata: {
          bookingId: booking.id,
        },
      }),
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      return NextResponse.json({ error: "Paystack initialization failed" }, { status: 500 });
    }

    // 4. Create Payment Record
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: serverCalculatedPrice,
        reference: paystackData.data.reference,
        status: "PENDING",
      },
    });

    return NextResponse.json({ 
      bookingId: booking.id, 
      authorization_url: paystackData.data.authorization_url,
      access_code: paystackData.data.access_code 
    });

  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
