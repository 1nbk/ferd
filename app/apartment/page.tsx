import Image from "next/image";

export const revalidate = 60; // Cache page for 60s (ISR)
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BookingWidget from "./BookingWidget";
import BrandLogo from "@/components/BrandLogo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";


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
      <Navigation theme="solid" />

      <div className="container" style={{ padding: "var(--spacing-lg) var(--spacing-sm)" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "var(--spacing-lg)", textAlign: "center" }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "var(--spacing-xs)" }}>{room.name}</h1>
          <p className="label-caps" style={{ color: "var(--color-gold)", letterSpacing: "0.2em" }}>Ho, Volta Region, Ghana</p>
        </div>

        {/* Gallery */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "var(--spacing-sm)", height: "600px", marginBottom: "var(--spacing-xl)", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{ position: "relative", backgroundColor: "var(--color-linen)" }}>
             <Image src={room.images[0] || "/images/living.png"} alt="Penthouse Living Room" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} priority />
          </div>
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "var(--spacing-sm)" }}>
            <div style={{ position: "relative", backgroundColor: "var(--color-linen)" }}>
              <Image src={room.images[1] || room.images[0] || "/images/bedroom.png"} alt="Penthouse Bedroom" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ position: "relative", backgroundColor: "var(--color-linen)" }}>
               <Image src={room.images[2] || room.images[0] || "/images/living.png"} alt="Penthouse Detail" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* Main Content Split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "var(--spacing-xl)", alignItems: "start" }}>
          
          {/* Left Column: Details */}
          <div>
            <div style={{ paddingBottom: "var(--spacing-lg)", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-lg)" }}>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "var(--spacing-md)" }}>About this Space</h2>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "var(--color-obsidian)", opacity: 0.9 }}>{room.description}</p>
            </div>

            <div style={{ paddingBottom: "var(--spacing-lg)", marginBottom: "var(--spacing-lg)" }}>
               <h3 className="label-caps" style={{ fontSize: "1rem", marginBottom: "var(--spacing-md)", color: "var(--color-gold)" }}>Exclusive Amenities</h3>
               <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", listStyle: "none" }}>
                  {room.amenities.map((item: string, idx: number) => (
                    <li key={idx} style={{ display: "flex", gap: "1rem", alignItems: "center", fontSize: "1.1rem" }}>
                      <span style={{ color: "var(--color-gold)", fontSize: "1.2rem" }}>✦</span> {item}
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div style={{ position: "sticky", top: "100px" }}>
            <BookingWidget pricePerNight={room.pricePerNight} roomId={room.id} />
          </div>
          
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
