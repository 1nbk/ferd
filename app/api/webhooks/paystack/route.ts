import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, paymentConfirmedTemplate } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(JSON.stringify(body))
      .digest("hex");

    if (hash !== req.headers.get("x-paystack-signature")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = body.event;

    if (event === "charge.success") {
      const { reference, metadata } = body.data;
      const bookingId = metadata?.bookingId;

      if (bookingId) {
        // 1. Update Booking Status
        const booking = await prisma.booking.update({
          where: { id: bookingId },
          data: { status: "CONFIRMED" },
          include: { guest: true, room: true, car: true }
        });

        // 2. Update Payment Record
        await prisma.payment.update({
          where: { reference },
          data: { status: "SUCCESS" }
        });

        // 3. Send Success Email
        await sendEmail({
          to: booking.guest.email,
          subject: "Payment Confirmed - Ferd's Luxury Rentals",
          html: paymentConfirmedTemplate(booking, booking.guest.name)
        });

        console.log(`Payment confirmed for Booking ${bookingId}`);
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
  }
}
