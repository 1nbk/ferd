import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BrandLogo from "@/components/BrandLogo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default async function CarsPage() {
  const cars = await prisma.car.findMany();

  return (
    <main>
      <Navigation theme="solid" />

      {/* Page Header */}
      <section className="container" style={{ padding: "var(--spacing-lg) var(--spacing-sm)", textAlign: "center" }}>
        <h1 style={{ fontSize: "4.5rem", marginBottom: "var(--spacing-xs)", color: "var(--color-obsidian)" }}>The Fleet</h1>
        <p style={{ fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto", opacity: 0.8 }}>
          Explore our exclusive collection of premium vehicles to enhance your stay in the Volta Region.
        </p>
      </section>

      {/* Vehicles Grid */}
      <section className="container" style={{ padding: "0 var(--spacing-sm)", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))", gap: "var(--spacing-xl)", marginBottom: "var(--spacing-xl)" }}>
        {cars.length === 0 ? (
          <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "var(--spacing-xl) 0" }}>
            <p>Our premium fleet is currently being updated. Please check back later.</p>
          </div>
        ) : (
          cars.map((car) => (
            <motion.article 
              key={car.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              
              {/* Image Box */}
              <div style={{ position: "relative", width: "100%", height: "300px", backgroundColor: "var(--color-linen)", marginBottom: "var(--spacing-md)", overflow: "hidden" }}>
                <Image 
                   src={car.images[0] || "/images/suv.png"} 
                   alt={car.name} 
                   fill 
                   style={{ objectFit: 'cover' }} 
                   className="hover-zoom"
                />
              </div>

              {/* Details */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--spacing-xs)" }}>
                  <h2 style={{ fontSize: "2.2rem" }}>{car.name}</h2>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", color: "var(--color-gold)" }}>GHS {car.pricePerDay}</span>
                    <span style={{ fontSize: "0.8rem", opacity: 0.6, display: "block" }}>per day</span>
                  </div>
                </div>
                
                <p className="label-caps" style={{ color: "var(--color-gold)", opacity: 0.9, marginBottom: "var(--spacing-sm)", letterSpacing: "0.15em" }}>{car.model}</p>
                
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "var(--spacing-md)" }}>
                   {car.features.map((feature: string) => (
                     <span key={feature} style={{ padding: "4px 12px", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", border: "0.5px solid var(--color-champagne)", borderRadius: "20px", color: "var(--color-obsidian)", opacity: 0.8 }}>
                       {feature}
                     </span>
                   ))}
                </div>
              </div>

              {/* Action Area */}
              <div style={{ borderTop: "0.5px solid var(--color-champagne)", paddingTop: "var(--spacing-md)", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                 <Link href={`/cars/${car.id}`} className="btn btn-outline" style={{ padding: "10px 40px" }}>
                   View Details
                 </Link>
              </div>

            </motion.article>
          ))
        )}
      </section>

      <Footer />
    </main>
  );
}
