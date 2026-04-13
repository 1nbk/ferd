import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail, paymentConfirmedTemplate } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    if (!signature || !process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(rawBody)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === "charge.success") {
      const { reference, metadata } = event.data;
      const bookingId = metadata?.bookingId;

      if (!bookingId) {
        console.error("No bookingId found in metadata for reference:", reference);
        return NextResponse.json({ error: "No booking ID" }, { status: 400 });
      }

      // Update payment
      await prisma.payment.updateMany({
        where: { reference },
        data: { status: "SUCCESS" },
      });

      // Update booking
      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CONFIRMED" },
        include: {
          guest: true,
          room: true,
          car: true,
        }
      });

      console.log(`Successfully confirmed booking ${bookingId}`);

      // Send confirmation email
      sendEmail({
        to: updatedBooking.guest.email,
        subject: "Reservation Confirmed - Ferd's Luxury Rentals",
        html: paymentConfirmedTemplate(updatedBooking, updatedBooking.guest.name)
      }).catch(err => console.error("Async email error:", err));
    }

    // Return 200 OK to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
