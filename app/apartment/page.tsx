import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BookingWidget from "./BookingWidget";
import BrandLogo from "@/components/BrandLogo";

export default async function ApartmentPage() {
  const room = await prisma.room.findFirst({
    where: { id: "luxury-penthouse-1" }
  });

  if (!room) {
    return (
      <div className="container" style={{ padding: "var(--spacing-xl) 0", textAlign: "center" }}>
        <h2>The penthouse is currently unavailable.</h2>
        <Link href="/" className="btn btn-outline" style={{ marginTop: "var(--spacing-md)" }}>Return Home</Link>
      </div>
    );
  }

  return (
    <main>
      {/* Navigation Header */}
      <nav className="container" style={{ padding: "var(--spacing-sm) var(--spacing-sm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <BrandLogo variant="light" size="sm" />
        <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
          <Link href="/apartment" className="label-caps" style={{ color: "var(--color-obsidian)", borderBottom: "1px solid var(--color-gold)" }}>Apartment</Link>
          <Link href="/cars" className="label-caps" style={{ color: "var(--color-obsidian)" }}>Cars</Link>
        </div>
      </nav>

      <div className="container" style={{ padding: "0 var(--spacing-sm) var(--spacing-md)" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "var(--spacing-md)", marginTop: "var(--spacing-sm)" }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "var(--spacing-xs)" }}>{room.name}</h1>
          <p className="label-caps" style={{ color: "var(--color-obsidian)", opacity: 0.8 }}>Ho, Volta Region</p>
        </div>

        {/* Gallery */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--spacing-xs)", height: "500px", marginBottom: "var(--spacing-lg)" }}>
          <div style={{ position: "relative", backgroundColor: "var(--color-linen)" }}>
             <Image src={room.images[0] || "/images/living.png"} alt="Penthouse Living Room" fill style={{ objectFit: 'cover' }} priority />
          </div>
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "var(--spacing-xs)" }}>
            <div style={{ position: "relative", backgroundColor: "var(--color-linen)" }}>
              <Image src={room.images[1] || room.images[0] || "/images/bedroom.png"} alt="Penthouse Bedroom" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ position: "relative", backgroundColor: "var(--color-linen)" }}>
               <Image src={room.images[2] || room.images[0] || "/images/living.png"} alt="Penthouse Detail" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* Main Content Split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "var(--spacing-lg)", alignItems: "start" }}>
          
          {/* Left Column: Details */}
          <div>
            <div style={{ paddingBottom: "var(--spacing-md)", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-md)" }}>
              <h2 style={{ fontSize: "2rem" }}>About this Space</h2>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{room.description}</p>
            </div>

            <div style={{ paddingBottom: "var(--spacing-md)", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-md)" }}>
               <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-sm)" }}>Amenities</h3>
               <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", listStyle: "none" }}>
                  {room.amenities.map((item: string, idx: number) => (
                    <li key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ color: "var(--color-gold)" }}>✦</span> {item}
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <BookingWidget pricePerNight={room.pricePerNight} roomId={room.id} />
          
        </div>
      </div>
      
      {/* Footer */}
      <footer className="container" style={{ padding: "var(--spacing-md) var(--spacing-sm)", textAlign: "center", borderTop: "0.5px solid var(--color-champagne)", marginTop: "var(--spacing-xl)" }}>
         <p style={{ opacity: 0.7 }}>&copy; {new Date().getFullYear()} Ferd's Luxury Rentals.</p>
      </footer>
    </main>
  );
}
