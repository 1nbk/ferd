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
      <section className="container" style={{ padding: "var(--spacing-lg) var(--spacing-sm)", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.4rem", marginBottom: "var(--spacing-xs)", color: "var(--color-obsidian)", letterSpacing: "-0.02em", fontWeight: 500 }}>The Fleet</h1>
        <p style={{ fontSize: "1.1rem", maxWidth: "550px", margin: "0 auto", opacity: 0.7, lineHeight: "1.6" }}>
          Explore our exclusive collection of premium vehicles to enhance your stay in the Volta Region.
        </p>
      </section>

      {/* Vehicles Grid (Client Component) */}
      <VehicleGrid cars={cars} />

      <Footer />
    </main>
  );
}
