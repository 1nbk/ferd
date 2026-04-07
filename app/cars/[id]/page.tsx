import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CarBookingWidget from "../CarBookingWidget";
import BrandLogo from "@/components/BrandLogo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

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
      <Navigation theme="solid" />

      <div className="container" style={{ padding: "var(--spacing-lg) var(--spacing-sm)" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "var(--spacing-lg)", textAlign: "center" }}>
          <h1 style={{ fontSize: "4.5rem", marginBottom: "var(--spacing-xs)" }}>{car.name}</h1>
          <p className="label-caps" style={{ color: "var(--color-gold)", letterSpacing: "0.2em" }}>{car.model}</p>
        </div>

        {/* Gallery/Main Image */}
        <div style={{ position: "relative", width: "100%", height: "600px", backgroundColor: "var(--color-linen)", marginBottom: "var(--spacing-xl)", borderRadius: "2px", overflow: "hidden" }}>
          <Image 
            src={car.images[0] || "/images/suv.png"} 
            alt={car.name} 
            fill 
            style={{ objectFit: 'cover' }} 
            priority
          />
        </div>

        {/* Main Content Split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "var(--spacing-xl)", alignItems: "start" }}>
          
          {/* Left Column: Details */}
          <div>
            <div style={{ paddingBottom: "var(--spacing-lg)", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-lg)" }}>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "var(--spacing-md)" }}>Vehicle Specifications</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "var(--spacing-md)" }}>
                 {car.features.map((feature: string, idx: number) => (
                   <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ color: "var(--color-gold)", fontSize: "1.2rem" }}>✦</span>
                      <span style={{ fontSize: "1.1rem", color: "var(--color-obsidian)", opacity: 0.9 }}>{feature}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div style={{ paddingBottom: "var(--spacing-lg)", marginBottom: "var(--spacing-lg)" }}>
               <h3 className="label-caps" style={{ fontSize: "1rem", marginBottom: "var(--spacing-sm)", color: "var(--color-gold)" }}>Rental Conditions</h3>
               <p style={{ opacity: 0.8, lineHeight: "1.8", fontSize: "1.1rem" }}>
                 All our vehicles are provided with a full tank of fuel and are meticulously detailed before handover. 
                 Drivers must be at least 25 years old and hold a valid driver&apos;s license. 
                 Daily rental prices include standard insurance and 24/7 roadside assistance.
               </p>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div style={{ position: "sticky", top: "100px" }}>
            <CarBookingWidget pricePerDay={car.pricePerDay} carId={car.id} />
          </div>
          
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
