import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CarsPage() {
  const cars = await prisma.car.findMany();

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

      {/* Page Header */}
      <section className="container" style={{ padding: "var(--spacing-md) var(--spacing-sm)", textAlign: "center", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-md)" }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "var(--spacing-xs)" }}>The Fleet</h1>
        <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          Explore our exclusive collection of premium vehicles to enhance your stay in the Volta Region.
        </p>
      </section>

      {/* Vehicles Grid */}
      <section className="container" style={{ padding: "0 var(--spacing-sm)", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "var(--spacing-lg)", marginBottom: "var(--spacing-xl)" }}>
        {cars.length === 0 ? (
          <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "var(--spacing-xl) 0" }}>
            <p>Our premium fleet is currently being updated. Please check back later.</p>
          </div>
        ) : (
          cars.map((car: any) => (
            <article key={car.id} style={{ display: "flex", flexDirection: "column" }}>
              
              {/* Image Box */}
              <div style={{ position: "relative", width: "100%", height: "250px", backgroundColor: "var(--color-linen)", marginBottom: "var(--spacing-md)" }}>
                <Image 
                   src={car.images[0] || "/images/suv.png"} 
                   alt={car.name} 
                   fill 
                   style={{ objectFit: 'cover' }} 
                />
              </div>

              {/* Details */}
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "var(--spacing-xs)" }}>{car.name}</h2>
                <p className="label-caps" style={{ color: "var(--color-obsidian)", opacity: 0.7, marginBottom: "var(--spacing-sm)" }}>{car.model}</p>
                
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "var(--spacing-md)" }}>
                   {car.features.map((feature: string) => (
                     <span key={feature} className="thin-border" style={{ padding: "2px 8px", fontSize: "0.8rem" }}>
                       {feature}
                     </span>
                   ))}
                </div>
              </div>

              {/* Action Area */}
              <div style={{ borderTop: "0.5px solid var(--color-champagne)", paddingTop: "var(--spacing-md)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                 <div>
                   <span style={{ fontSize: "1.5rem", fontFamily: "var(--font-serif)" }}>GHS {car.pricePerDay}</span>
                   <span style={{ opacity: 0.6 }}>/ day</span>
                 </div>
                 
                 <Link href={`/cars/${car.id}`} className="btn btn-outline">
                   Reserve
                 </Link>
              </div>

            </article>
          ))
        )}
      </section>

      {/* Footer */}
      <footer className="container" style={{ padding: "var(--spacing-md) var(--spacing-sm)", textAlign: "center", borderTop: "0.5px solid var(--color-champagne)", marginTop: "var(--spacing-xl)" }}>
         <p style={{ opacity: 0.7 }}>&copy; {new Date().getFullYear()} Ferd's Luxury Rentals.</p>
      </footer>
    </main>
  );
}
