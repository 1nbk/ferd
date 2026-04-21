import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BrandLogo from "@/components/BrandLogo";
import { notFound } from "next/navigation";
import StatusPoller from "./StatusPoller";

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

  // If payment hasn't cleared yet, show a holding page
  if (booking.status === "PENDING") {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "var(--color-ivory)", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <nav style={{ padding: "var(--spacing-lg) 0", width: "100%", textAlign: "center", borderBottom: "0.5px solid var(--color-champagne)" }}>
          <BrandLogo variant="light" size="sm" />
        </nav>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "var(--spacing-xl) var(--spacing-sm)", textAlign: "center", maxWidth: "500px", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--spacing-lg)" }}>
            <div style={{ position: "relative", width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", inset: 0, border: "1px dashed var(--color-gold)", borderRadius: "50%", animation: "spin 8s linear infinite", opacity: 0.5 }} />
              <div style={{ position: "absolute", inset: "10px", border: "0.5px solid var(--color-champagne)", borderRadius: "50%" }} />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "pulse 2s ease-in-out infinite" }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
          <h1 style={{ fontSize: "2rem", fontFamily: "var(--font-serif)", color: "var(--color-obsidian)", marginBottom: "var(--spacing-sm)", fontWeight: 400 }}>Securing Reservation</h1>
          <p style={{ fontSize: "1rem", color: "var(--color-obsidian)", opacity: 0.6, marginBottom: "var(--spacing-xl)", lineHeight: 1.8, letterSpacing: "0.02em" }}>
            We are confirming your transaction. Please do not close this page; it will automatically update momentarily.
          </p>
          
          <div style={{ padding: "var(--spacing-md)", backgroundColor: "var(--color-linen)", border: "0.5px solid var(--color-champagne)", borderRadius: "2px" }}>
            <StatusPoller bookingId={params.bookingId} />
          </div>
        </div>
        <style>{`
          @keyframes spin { 100% { transform: rotate(360deg); } }
          @keyframes pulse { 0%, 100% { opacity: 0.6; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.05); } }
        `}</style>
      </main>
    );
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

    <main style={{ minHeight: "100vh", backgroundColor: "var(--color-ivory)", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {/* Header */}
      <nav style={{ padding: "var(--spacing-lg) 0", width: "100%", textAlign: "center" }}>
        <BrandLogo variant="light" size="sm" />
      </nav>

      {/* Main Confirmation Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "var(--spacing-lg) var(--spacing-sm)", textAlign: "center", maxWidth: "600px", width: "100%" }}>
        
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--spacing-lg)" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "var(--color-linen)", display: "flex", alignItems: "center", justifyContent: "center", border: "0.5px solid var(--color-champagne)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </div>

        <h1 style={{ fontSize: "2.5rem", fontFamily: "var(--font-serif)", fontWeight: 400, color: "var(--color-obsidian)", marginBottom: "var(--spacing-xs)" }}>Reservation Confirmed</h1>
        
        <p style={{ fontSize: "1.05rem", color: "var(--color-obsidian)", opacity: 0.7, marginBottom: "var(--spacing-xl)", lineHeight: 1.6 }}>
          Thank you, {booking.guest.name}. Your experience is secured.<br />A detailed confirmation has been sent to your email.
        </p>

        {/* Receipt Card */}
        <div style={{ backgroundColor: "#fff", border: "1px solid var(--color-champagne)", padding: "var(--spacing-xl)", textAlign: "left", marginBottom: "var(--spacing-xl)", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", position: "relative" }}>
           
           {/* Decorative corner accents */}
           <div style={{ position: "absolute", top: 0, left: 0, width: "15px", height: "15px", borderTop: "1px solid var(--color-gold)", borderLeft: "1px solid var(--color-gold)", margin: "10px" }} />
           <div style={{ position: "absolute", top: 0, right: 0, width: "15px", height: "15px", borderTop: "1px solid var(--color-gold)", borderRight: "1px solid var(--color-gold)", margin: "10px" }} />
           <div style={{ position: "absolute", bottom: 0, left: 0, width: "15px", height: "15px", borderBottom: "1px solid var(--color-gold)", borderLeft: "1px solid var(--color-gold)", margin: "10px" }} />
           <div style={{ position: "absolute", bottom: 0, right: 0, width: "15px", height: "15px", borderBottom: "1px solid var(--color-gold)", borderRight: "1px solid var(--color-gold)", margin: "10px" }} />

           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--spacing-lg)", paddingBottom: "var(--spacing-md)", borderBottom: "0.5px solid var(--color-champagne)" }}>
             <div>
               <p className="label-caps" style={{ color: "var(--color-gold)", fontSize: "0.7rem", marginBottom: "8px" }}>Reference</p>
               <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", letterSpacing: "0.15em", color: "var(--color-obsidian)" }}>{referenceId}</p>
             </div>
             <div style={{ textAlign: "right" }}>
               <p className="label-caps" style={{ color: "var(--color-gold)", fontSize: "0.7rem", marginBottom: "8px" }}>Status</p>
               <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", letterSpacing: "0.1em", color: "#10B981", textTransform: "uppercase" }}>Paid</p>
             </div>
           </div>

           <div style={{ marginBottom: "var(--spacing-lg)" }}>
             <p className="label-caps" style={{ color: "var(--color-gold)", fontSize: "0.7rem", marginBottom: "8px" }}>Reservation Details</p>
             <p style={{ fontSize: "1.2rem", fontFamily: "var(--font-serif)", color: "var(--color-obsidian)", marginBottom: "4px" }}>{resourceName}</p>
             <p style={{ fontSize: "0.9rem", color: "var(--color-obsidian)", opacity: 0.7 }}>{dateText} <span style={{ opacity: 0.5, margin: "0 8px" }}>|</span> {durationText}</p>
           </div>
           
           <div style={{ backgroundColor: "var(--color-linen)", padding: "var(--spacing-md)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
             <span className="label-caps" style={{ fontSize: "0.8rem", color: "var(--color-obsidian)", letterSpacing: "0.1em" }}>Total Processed</span>
             <span style={{ fontSize: "1.4rem", fontFamily: "var(--font-serif)", color: "var(--color-obsidian)" }}>GHS {booking.totalPrice.toLocaleString()}</span>
           </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <Link href="/" className="btn btn-outline" style={{ width: "100%", maxWidth: "300px", padding: "16px", fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Return to Homepage
          </Link>
          <Link href={isCar ? "/cars" : "/apartment"} style={{ fontSize: "0.85rem", color: "var(--color-gold)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "1rem", borderBottom: "1px solid transparent", transition: "border-color 0.3s" }} onMouseOver={(e) => e.currentTarget.style.borderBottomColor = "var(--color-gold)"} onMouseOut={(e) => e.currentTarget.style.borderBottomColor = "transparent"}>
             Explore More {isCar ? "Vehicles" : "Properties"}
          </Link>
        </div>
        
        <p style={{ marginTop: "var(--spacing-2xl)", fontSize: "0.8rem", opacity: 0.5, color: "var(--color-obsidian)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Need assistance? Contact concierge at reservations@ferds.com
        </p>
      </div>

    </main>
  );
}
