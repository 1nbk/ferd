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

      // Get the existing booking
      const existingBooking = await prisma.booking.findUnique({
        where: { id: bookingId }
      });

      if (!existingBooking) {
        console.error("Booking not found:", bookingId);
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
      }

      // Check for overlap JUST IN CASE this payment came in way late
      const overlapping = await prisma.booking.findFirst({
        where: {
          roomId: existingBooking.roomId || undefined,
          carId: existingBooking.carId || undefined,
          id: { not: bookingId }, // Exclude self
          status: "CONFIRMED", // Only care if someone else actually confirmed it
          AND: [
             { checkIn: { lt: existingBooking.checkOut } },
             { checkOut: { gt: existingBooking.checkIn } }
          ]
        }
      });

      if (overlapping) {
        // Double-booked! Mark as conflict to handle refunds
        await prisma.booking.update({
          where: { id: bookingId },
          data: { status: "CONFLICT_NEEDS_REFUND" }
        });
        
        console.error(`DOUBLE BOOKING CONFLICT DETECTED for booking ${bookingId}`);
        
        // Notify admin to process refund
        sendEmail({
           to: process.env.EMAIL_FROM || "reservations@ferd.com",
           subject: "🚨 URGENT: Double Booking / Refund Required",
           html: `<p>A suspiciously late payment was processed for Booking <strong>${bookingId}</strong>, but those dates were already confirmed by someone else.</p><p>Please issue a manual refund on Paystack for Reference: <strong>${reference}</strong></p>`
        }).catch(err => console.error("Async email error:", err));
      } else {
        // Update booking securely
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
    }

    // Return 200 OK to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
