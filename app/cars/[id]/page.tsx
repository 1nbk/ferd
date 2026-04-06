import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CarBookingWidget from "../CarBookingWidget";

export default async function CarDetailsPage({ params }: { params: { id: string } }) {
  const car = await prisma.car.findUnique({
    where: { id: params.id }
  });

  if (!car) {
    return (
      <div className="container" style={{ padding: "var(--spacing-xl) 0", textAlign: "center" }}>
        <h2>This vehicle is currently unavailable.</h2>
        <Link href="/cars" className="btn btn-outline" style={{ marginTop: "var(--spacing-md)" }}>Return to Fleet</Link>
      </div>
    );
  }

  return (
    <main>
      {/* Navigation Header */}
      <nav className="container" style={{ padding: "var(--spacing-sm) var(--spacing-sm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Ferd's" width={120} height={40} priority />
        </Link>
        <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
          <Link href="/apartment" className="label-caps" style={{ color: "var(--color-obsidian)" }}>Apartment</Link>
          <Link href="/cars" className="label-caps" style={{ color: "var(--color-obsidian)", borderBottom: "1px solid var(--color-gold)" }}>Cars</Link>
        </div>
      </nav>

      <div className="container" style={{ padding: "0 var(--spacing-sm) var(--spacing-md)" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "var(--spacing-md)", marginTop: "var(--spacing-sm)" }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "var(--spacing-xs)" }}>{car.name}</h1>
          <p className="label-caps" style={{ color: "var(--color-obsidian)", opacity: 0.8 }}>{car.model}</p>
        </div>

        {/* Gallery/Main Image */}
        <div style={{ position: "relative", width: "100%", height: "500px", backgroundColor: "var(--color-linen)", marginBottom: "var(--spacing-lg)" }}>
          <Image 
            src={car.images[0] || "/images/suv.png"} 
            alt={car.name} 
            fill 
            style={{ objectFit: 'cover' }} 
            priority
          />
        </div>

        {/* Main Content Split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "var(--spacing-lg)", alignItems: "start" }}>
          
          {/* Left Column: Details */}
          <div>
            <div style={{ paddingBottom: "var(--spacing-md)", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-md)" }}>
              <h2 style={{ fontSize: "2rem" }}>Vehicle Specifications</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "var(--spacing-md)" }}>
                 {car.features.map((feature: string, idx: number) => (
                   <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ color: "var(--color-gold)", fontSize: "1.2rem" }}>✦</span>
                      <span style={{ fontSize: "1.1rem" }}>{feature}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div style={{ paddingBottom: "var(--spacing-md)", marginBottom: "var(--spacing-md)" }}>
               <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-sm)" }}>Rental Conditions</h3>
               <p style={{ opacity: 0.8, lineHeight: "1.6" }}>
                 All our vehicles are provided with a full tank of fuel and are meticulously detailed before handover. 
                 Drivers must be at least 25 years old and hold a valid driver's license. 
                 Daily rental prices include standard insurance.
               </p>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <CarBookingWidget pricePerDay={car.pricePerDay} carId={car.id} />
          
        </div>
      </div>
      
      {/* Footer */}
      <footer className="container" style={{ padding: "var(--spacing-md) var(--spacing-sm)", textAlign: "center", borderTop: "0.5px solid var(--color-champagne)", marginTop: "var(--spacing-xl)" }}>
         <p style={{ opacity: 0.7 }}>&copy; {new Date().getFullYear()} Ferd's Luxury Rentals.</p>
      </footer>
    </main>
  );
}
