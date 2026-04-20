import nodemailer from "nodemailer";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailPayload) {
  // Skip silently if SMTP credentials are not configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log(`[Email skipped – no SMTP credentials] To: ${to} | Subject: ${subject}`);
    return { success: false, error: "SMTP not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
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

const commonStyles = `
  font-family: 'Playfair Display', serif;
  background-color: #FDFCFB;
  color: #1A1A1A;
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #E5D5C0;
`;

const headerStyle = `
  text-align: center;
  border-bottom: 0.5px solid #E5D5C0;
  padding-bottom: 30px;
  margin-bottom: 30px;
`;

const footerStyle = `
  margin-top: 40px;
  padding-top: 20px;
  border-top: 0.5px solid #E5D5C0;
  text-align: center;
  font-size: 0.8rem;
  color: #8C7E6A;
  font-family: sans-serif;
  letter-spacing: 0.05em;
`;

export const bookingPendingTemplate = (booking: any, guestName: string) => `
  <div style="${commonStyles}">
    <div style="${headerStyle}">
      <h1 style="color: #8C7E6A; font-weight: 300; letter-spacing: 0.1em; margin: 0; font-size: 24px; text-transform: uppercase;">Reservation Received</h1>
    </div>
    
    <p style="font-size: 1.1rem; line-height: 1.6;">Dear ${guestName},</p>
    <p style="line-height: 1.6; opacity: 0.9;">We are preparing for your arrival. Your reservation request for <strong>Ferd's Luxury Rentals</strong> has been successfully received.</p>
    
    <div style="background-color: #FAF9F6; border: 0.5px solid #E5D5C0; padding: 25px; margin: 30px 0;">
      <p style="margin: 0 0 10px 0; font-size: 0.7rem; text-transform: uppercase; color: #8C7E6A; letter-spacing: 0.2em;">Booking Summary</p>
      <h3 style="margin: 0 0 20px 0; font-weight: 400; color: #1A1A1A; font-size: 1.4rem;">${booking.room ? booking.room.name : (booking.car ? booking.car.name : 'Exclusive Rental')}</h3>
      
      <div style="display: grid; gap: 10px; font-size: 0.95rem;">
        <p style="margin: 5px 0;"><strong>ID:</strong> #${booking.id.slice(-6).toUpperCase()}</p>
        <p style="margin: 5px 0;"><strong>Dates:</strong> ${new Date(booking.checkIn).toLocaleDateString("en-GB", { day: 'numeric', month: 'short' })} — ${new Date(booking.checkOut).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        <p style="margin: 5px 0;"><strong>Total:</strong> GHS ${booking.totalPrice.toLocaleString()}</p>
      </div>
    </div>
    
    <p style="line-height: 1.6; font-style: italic; color: #8C7E6A;">Your reservation is currently <strong>PENDING</strong> verification. Once payment is confirmed, your dates will be officially secured.</p>
    
    <div style="${footerStyle}">
      <p style="margin-bottom: 10px;">FERD'S LUXURY RENTALS</p>
      <p>EST. 2024 — ACCRA, GHANA</p>
    </div>
  </div>
`;

export const paymentConfirmedTemplate = (booking: any, guestName: string) => `
  <div style="${commonStyles}">
    <div style="${headerStyle}">
      <h1 style="color: #4A5D4E; font-weight: 300; letter-spacing: 0.1em; margin: 0; font-size: 24px; text-transform: uppercase;">Reservation Secured</h1>
    </div>
    
    <p style="font-size: 1.1rem; line-height: 1.6;">Dear ${guestName},</p>
    <p style="line-height: 1.6; opacity: 0.9;">We are delighted to confirm that your payment for <strong>Booking #${booking.id.slice(-6).toUpperCase()}</strong> has been verified. Your experience at Ferd's is now officially secured.</p>
    
    <div style="background-color: #F4F7F5; border: 0.5px solid #D0DED3; padding: 25px; margin: 30px 0; text-align: center;">
      <p style="margin: 0; color: #4A5D4E; font-size: 1.2rem; font-weight: 500;">Status: Officially Confirmed</p>
    </div>
    
    <p style="line-height: 1.6;">Our concierge team will reach out shortly with check-in details. If you have any bespoke requirements for your stay, please do not hesitate to contact us.</p>
    
    <p style="margin-top: 30px; font-style: italic;">We look forward to welcoming you.</p>

    <div style="${footerStyle}">
      <p style="margin-bottom: 10px;">FERD'S LUXURY RENTALS</p>
      <p>Ho, Volta Region, Ghana</p>
    </div>
  </div>
`;
