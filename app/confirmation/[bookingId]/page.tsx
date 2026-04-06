import Link from "next/link";
import Image from "next/image";

export default function ConfirmationPage({ params }: { params: { bookingId: string } }) {
  // In reality, we would fetch the booking from Prisma using params.bookingId
  const referenceId = params.bookingId.toUpperCase().slice(0, 8);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--color-ivory)", display: "flex", flexDirection: "column" }}>
      
      {/* Header */}
      <nav className="container" style={{ padding: "var(--spacing-md) var(--spacing-sm)", width: "100%", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-xl)" }}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Ferd's" width={120} height={40} priority />
        </Link>
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
          Thank you for choosing Ferd's. Your reservation is locked in, and a confirmation email is on its way.
        </p>

        <div className="thin-border" style={{ padding: "var(--spacing-lg)", backgroundColor: "var(--color-linen)", textAlign: "left", marginBottom: "var(--spacing-lg)" }}>
           <p className="label-caps" style={{ marginBottom: "var(--spacing-xs)", color: "var(--color-obsidian)" }}>Reference ID</p>
           <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-sans)", fontWeight: 700, marginBottom: "var(--spacing-md)", color: "var(--color-gold)", letterSpacing: "0.1em" }}>
             {referenceId}
           </p>

           <div style={{ paddingBottom: "var(--spacing-sm)", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-sm)" }}>
             <p style={{ fontWeight: 500, fontSize: "1.2rem" }}>The Platinum Suite</p>
             <p style={{ opacity: 0.7 }}>2 Nights (Oct 12 - Oct 14)</p>
           </div>
           
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
             <span style={{ fontWeight: 500 }}>Total Paid</span>
             <span style={{ fontSize: "1.2rem", fontFamily: "var(--font-serif)" }}>GHS 900</span>
           </div>
        </div>

        <Link href="/" className="btn btn-outline" style={{ display: "inline-block" }}>
          Return to Homepage
        </Link>
        <p style={{ marginTop: "var(--spacing-lg)", fontSize: "0.9rem", opacity: 0.6 }}>
          Need assistance? Contact us at reservations@ferds.com or +233 54 123 4567.
        </p>
      </div>

    </main>
  );
}
