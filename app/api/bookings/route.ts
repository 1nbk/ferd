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
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Start of today

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    // Security: Prevents booking dates in the past
    if (start < now) {
      return NextResponse.json({ error: "Check-in date cannot be in the past" }, { status: 400 });
    }
    if (end <= start) {
      return NextResponse.json({ error: "Check-out must be at least one day after check-in" }, { status: 400 });
    }

    const diffDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

    // Sanitization: Clean up guest inputs
    const cleanGuest = {
      email: guest.email.trim().toLowerCase(),
      name: guest.name.trim(),
      phone: guest.phone.trim(),
      idDocumentUrl: guest.idDocumentUrl,
      idNumber: guest.idNumber,
      idVerified: guest.idVerified,
    };

    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    // Run price lookup + overlap check in parallel — fully independent
    const [resource, overlapping] = await Promise.all([
      roomId
        ? prisma.room.findUnique({ where: { id: roomId } })
        : prisma.car.findUnique({ where: { id: carId! } }),
      prisma.booking.findFirst({
        where: {
          roomId: roomId || undefined,
          carId: carId || undefined,
          OR: [
            { status: "CONFIRMED" },
            { status: "PENDING", createdAt: { gte: thirtyMinutesAgo } },
          ],
          AND: [{ checkIn: { lt: end } }, { checkOut: { gt: start } }],
        },
      }),
    ]);

    if (!resource) {
      return NextResponse.json({ error: roomId ? "Room not found" : "Car not found" }, { status: 404 });
    }
    serverCalculatedPrice = roomId
      ? (resource as any).pricePerNight * diffDays
      : (resource as any).pricePerDay * diffDays;

    if (Math.abs(totalPrice - serverCalculatedPrice) > 1) {
      console.warn(`Price mismatch for ${guest.email}: client=${totalPrice}, server=${serverCalculatedPrice}`);
    }

    if (overlapping) {
      return NextResponse.json({ error: "These dates are no longer available. Please select different dates." }, { status: 409 });
    }

    // 1. Create or Find Guest
    const guestRecord = await prisma.guest.upsert({
      where: { email: cleanGuest.email },
      update: { 
        name: cleanGuest.name, 
        phone: cleanGuest.phone,
        ...(cleanGuest.idDocumentUrl && { idDocumentUrl: cleanGuest.idDocumentUrl }),
        ...(cleanGuest.idNumber && { idNumber: cleanGuest.idNumber }),
        ...(cleanGuest.idVerified !== undefined && { idVerified: cleanGuest.idVerified })
      },
      create: {
        email: cleanGuest.email,
        name: cleanGuest.name,
        phone: cleanGuest.phone,
        idDocumentUrl: cleanGuest.idDocumentUrl,
        idNumber: cleanGuest.idNumber,
        idVerified: cleanGuest.idVerified || false,
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
      to: cleanGuest.email,
      subject: "Reservation Received - Ferd's Luxury Rentals",
      html: bookingPendingTemplate(booking, cleanGuest.name || guestRecord.name)
    }).catch(err => console.error("Async email error:", err));

    if (!process.env.PAYSTACK_SECRET_KEY) {
      console.error("PAYSTACK_SECRET_KEY is missing in env");
      return NextResponse.json({ error: "Payment configuration error" }, { status: 500 });
    }

    // Email + Paystack init run concurrently — they're fully independent
    const [, paystackRes] = await Promise.all([
      sendEmail({
        to: cleanGuest.email,
        subject: "Reservation Received - Ferd's Luxury Rentals",
        html: bookingPendingTemplate(booking, cleanGuest.name || guestRecord.name),
      }).catch(err => console.error("Async email error:", err)),
      fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanGuest.email,
          amount: Math.round(serverCalculatedPrice * 100),
          currency: "GHS",
          reference: `FERD_${booking.id}`,
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/confirmation/${booking.id}`,
          metadata: { bookingId: booking.id },
        }),
      }),
    ]);

    const paystackData = await (paystackRes as Response).json();

    if (!paystackData.status) {
      return NextResponse.json({ error: "Paystack initialization failed" }, { status: 500 });
    }

    // Create payment record (needs Paystack reference — must come after)
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
      access_code: paystackData.data.access_code,
    });


  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
