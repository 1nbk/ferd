import { prisma } from "@/lib/prisma";

export const revalidate = 60; // Cache page for 60s (ISR)
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VehicleGrid from "@/components/VehicleGrid";

export default async function CarsPage() {
  const cars = await prisma.car.findMany();

  return (
    <main>
      <Navigation theme="solid" />

      {/* Page Header */}
      <section className="container" style={{ padding: "var(--spacing-sm) var(--spacing-sm)", textAlign: "center" }}>
        <h1 style={{ 
          fontSize: "0.9rem", 
          marginBottom: "var(--spacing-xs)", 
          textTransform: "uppercase", 
          letterSpacing: "0.4em", 
          fontWeight: 400,
          color: "var(--color-obsidian)",
          opacity: 0.8
        }}>
          The Fleet
        </h1>
        <p style={{ fontSize: "0.85rem", maxWidth: "400px", margin: "0 auto", opacity: 0.5, lineHeight: "1.6", letterSpacing: "0.02em" }}>
          Premium mobility solutions for the discerning traveler.
        </p>
      </section>

      {/* Vehicles Grid (Client Component) */}
      <VehicleGrid cars={cars} />

      <Footer />
    </main>
  );
}
