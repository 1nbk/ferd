import nodemailer from "nodemailer";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailPayload) {
  // 1. Create a transporter
  // For production, the user should provide real SMTP credentials in .env.local
  // If not provided, we can use a mock/ethereal account for testing (optional step)
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.ethereal.email",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER || "mock_user", // user
      pass: process.env.EMAIL_PASS || "mock_pass", // password
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Ferd's Luxury Rentals" <${process.env.EMAIL_FROM || "noreply@ferd.com"}>`,
      to,
      subject,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    
    // Preview URL for Ethereal accounts
    if (process.env.EMAIL_HOST?.includes("ethereal")) {
       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

// --- HELPER TEMPLATES ---

export const bookingPendingTemplate = (booking: any, guestName: string) => `
  <div style="font-family: serif; color: #1A1610; padding: 20px; border: 1px solid #C9A87A;">
    <h1 style="color: #8B6F47;">Reservation Received</h1>
    <p>Dear ${guestName},</p>
    <p>We have received your reservation request for <strong>Ferd's Luxury Rentals</strong>.</p>
    <div style="background-color: #F5EFE6; padding: 15px; margin: 20px 0;">
      <p><strong>Booking ID:</strong> ${booking.id}</p>
      <p><strong>Resource:</strong> ${booking.room ? booking.room.name : (booking.car ? booking.car.name : 'Rental')}</p>
      <p><strong>Dates:</strong> ${new Date(booking.checkIn).toLocaleDateString()} to ${new Date(booking.checkOut).toLocaleDateString()}</p>
      <p><strong>Total Price:</strong> GHS ${booking.totalPrice}</p>
    </div>
    <p>Your reservation is currently <strong>PENDING</strong> awaiting payment verification. If you haven't completed your payment yet, please do so using the link provided in your dashboard.</p>
    <p>Once verified, you will receive a confirmation email.</p>
    <p>Warm regards,<br/>The Ferd's Team</p>
  </div>
`;

export const paymentConfirmedTemplate = (booking: any, guestName: string) => `
  <div style="font-family: serif; color: #1A1610; padding: 20px; border: 1px solid #C9A87A;">
    <h1 style="color: #8B6F47;">Payment Confirmed & Reservation Secured</h1>
    <p>Dear ${guestName},</p>
    <p>We are delighted to inform you that your payment for <strong>Booking #${booking.id}</strong> has been successfully verified.</p>
    <div style="background-color: #d1fae5; padding: 15px; margin: 20px 0; border: 1px solid #065f46;">
      <h2 style="color: #065f46; margin-top: 0;">Reservation Confirmed</h2>
      <p>Your stay/rental at <strong>Ferd's</strong> is now officially secured.</p>
    </div>
    <p>We look forward to welcoming you soon. If you have any special requests, please reply to this email or contact our support.</p>
    <p>Best Regards,<br/>Management, Ferd's Luxury Rentals</p>
  </div>
`;
