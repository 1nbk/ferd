import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BrandLogo from "@/components/BrandLogo";
import { notFound } from "next/navigation";

export default async function ConfirmationPage({ params, searchParams }: { params: { bookingId: string }, searchParams: { reference: string } }) {
  const booking = await prisma.booking.findUnique({
    where: { id: params.bookingId },
    include: {
      room: true,
      car: true,
      guest: true,
    }
  });

  if (!booking) {
    return notFound();
  }

  const resourceName = booking.room ? booking.room.name : (booking.car ? booking.car.name : "Unknown Resource");
  const referenceId = searchParams.reference || booking.id.toUpperCase().slice(0, 8);
  const isCar = !!booking.car;

  const daysMs = new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime();
  let durationText = "";
  if (isCar) {
     const days = Math.round(daysMs / 86400000) || 1;
     durationText = `${days} Day${days > 1 ? "s" : ""}`;
  } else {
     const nights = Math.round(daysMs / 86400000);
     durationText = `${nights} Night${nights > 1 ? "s" : ""}`;
  }

  const dateText = `${new Date(booking.checkIn).toLocaleDateString("en-GB", { month: "short", day: "numeric" })} - ${new Date(booking.checkOut).toLocaleDateString("en-GB", { month: "short", day: "numeric" })}`;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--color-ivory)", display: "flex", flexDirection: "column" }}>
      
      {/* Header */}
      <nav className="container" style={{ padding: "var(--spacing-md) var(--spacing-sm)", width: "100%", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-xl)" }}>
        <BrandLogo variant="light" size="sm" />
      </nav>

      {/* Main Confirmation Content */}
      <div className="container" style={{ flex: 1, padding: "0 var(--spacing-sm)", textAlign: "center", maxWidth: "600px" }}>
        
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--spacing-md)" }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <h1 style={{ fontSize: "3rem", marginBottom: "var(--spacing-sm)" }}>Booking Confirmed</h1>
        
        <p style={{ fontSize: "1.1rem", marginBottom: "var(--spacing-md)", opacity: 0.8 }}>
          Thank you for choosing Ferd's, {booking.guest.name}. Your reservation is locked in, and a confirmation email is on its way.
        </p>

        <div className="thin-border" style={{ padding: "var(--spacing-lg)", backgroundColor: "var(--color-linen)", textAlign: "left", marginBottom: "var(--spacing-lg)" }}>
           <p className="label-caps" style={{ marginBottom: "var(--spacing-xs)", color: "var(--color-obsidian)" }}>Reference ID</p>
           <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-sans)", fontWeight: 700, marginBottom: "var(--spacing-md)", color: "var(--color-gold)", letterSpacing: "0.1em" }}>
             {referenceId}
           </p>

           <div style={{ paddingBottom: "var(--spacing-sm)", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-sm)" }}>
             <p style={{ fontWeight: 500, fontSize: "1.2rem" }}>{resourceName}</p>
             <p style={{ opacity: 0.7 }}>{durationText} ({dateText})</p>
           </div>
           
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
             <span style={{ fontWeight: 500 }}>Total Paid</span>
             <span style={{ fontSize: "1.2rem", fontFamily: "var(--font-serif)" }}>GHS {booking.totalPrice.toLocaleString()}</span>
           </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link href="/" className="btn btn-outline" style={{ display: "inline-block" }}>
            Return Home
          </Link>
          <Link href={isCar ? "/cars" : "/apartment"} className="btn btn-primary" style={{ display: "inline-block" }}>
             View {isCar ? "More Cars" : "Apartment"}
          </Link>
        </div>
        
        <p style={{ marginTop: "var(--spacing-lg)", fontSize: "0.9rem", opacity: 0.6 }}>
          Need assistance? Contact us at reservations@ferds.com or +233 54 123 4567.
        </p>
      </div>

    </main>
  );
}
