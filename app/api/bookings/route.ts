import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { roomId, carId, checkIn, checkOut, totalPrice, guest } = await req.json();

    if ((!roomId && !carId) || !checkIn || !checkOut || !guest.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Create or Find Guest
    const guestRecord = await prisma.guest.upsert({
      where: { email: guest.email },
      update: { name: guest.name, phone: guest.phone },
      create: {
        email: guest.email,
        name: guest.name,
        phone: guest.phone,
      },
    });

    // 2. Create Booking
    const booking = await prisma.booking.create({
      data: {
        roomId: roomId || null,
        carId: carId || null,
        guestId: guestRecord.id,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        totalPrice,
        status: "PENDING",
      },
    });

    // 3. Initialize Paystack Transaction
    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: guest.email,
        amount: totalPrice * 100, // Paystack uses kobo/cents
        reference: `FERD_${booking.id}`,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/bookings/callback`,
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
        amount: totalPrice,
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
