"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function BookingPage() {
  // Using query params to see if they came from apartment or cars page
  // e.g., ?roomId=room_1 or ?carId=car_2
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Proceed to payment / confirmation logic
    console.log("Submitting booking with:", formData);
    alert("Booking form submitted! Moving to confirmation...");
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--color-ivory)" }}>
      
      {/* Header */}
      <nav className="container" style={{ padding: "var(--spacing-md) var(--spacing-sm)", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-lg)" }}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Ferd's" width={120} height={40} priority />
        </Link>
      </nav>

      <div className="container" style={{ padding: "0 var(--spacing-sm)", display: "grid", gridTemplateColumns: "1fr 400px", gap: "var(--spacing-xl)" }}>
        
        {/* Form Column */}
        <section>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "var(--spacing-md)" }}>Guest Details</h1>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--spacing-sm)" }}>
               <div>
                  <label htmlFor="firstName" className="label-caps" style={{ display: "block", marginBottom: "var(--spacing-xs)" }}>First Name</label>
                  <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} />
               </div>
               <div>
                  <label htmlFor="lastName" className="label-caps" style={{ display: "block", marginBottom: "var(--spacing-xs)" }}>Last Name</label>
                  <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} />
               </div>
            </div>

            <div>
               <label htmlFor="email" className="label-caps" style={{ display: "block", marginBottom: "var(--spacing-xs)" }}>Email Address</label>
               <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>

            <div>
               <label htmlFor="phone" className="label-caps" style={{ display: "block", marginBottom: "var(--spacing-xs)" }}>Phone / WhatsApp</label>
               <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
            </div>

            <div>
               <label htmlFor="notes" className="label-caps" style={{ display: "block", marginBottom: "var(--spacing-xs)" }}>Special Requests</label>
               <textarea id="notes" name="notes" rows={4} value={formData.notes} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: "var(--spacing-md)", fontSize: "1rem" }}>
              Continue to Payment
            </button>
          </form>
        </section>

        {/* Order Summary Column */}
        <aside className="thin-border" style={{ padding: "var(--spacing-md)", backgroundColor: "var(--color-linen)", height: "fit-content", position: "sticky", top: "2rem" }}>
           <h2 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-md)", borderBottom: "0.5px solid var(--color-champagne)", paddingBottom: "var(--spacing-sm)" }}>Your Stay</h2>
           
           {/* Mock Selection for layout purposes */}
           <div style={{ marginBottom: "var(--spacing-sm)" }}>
             <p style={{ fontWeight: 500, fontSize: "1.1rem" }}>The Platinum Suite</p>
             <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>2 Nights (Oct 12 - Oct 14)</p>
           </div>
           
           <div style={{ padding: "var(--spacing-sm) 0", borderTop: "0.5px solid var(--color-champagne)", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-sm)", display: "flex", justifyContent: "space-between" }}>
             <span>Subtotal</span>
             <span>GHS 900</span>
           </div>

           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--spacing-md)" }}>
             <span style={{ fontWeight: 700 }}>Total</span>
             <span style={{ fontSize: "1.5rem", fontFamily: "var(--font-serif)" }}>GHS 900</span>
           </div>
           
           <ul style={{ fontSize: "0.8rem", opacity: 0.7, listStyle: "inside", marginTop: "var(--spacing-md)" }}>
             <li>Free cancellation for 48 hours</li>
             <li>You will pay via Paystack (Local/Cards)</li>
           </ul>
        </aside>

      </div>
    </main>
  );
}
