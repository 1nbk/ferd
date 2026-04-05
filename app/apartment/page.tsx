"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Temporary mock data (to be replaced by Prisma fetching later)
const MOCK_ROOM = {
  id: "room_1",
  name: "The Platinum Suite",
  description: "Experience the pinnacle of luxury in Ho. This suite features a king-sized bed, panoramic balcony, a pristine en-suite bathroom with a rainfall shower, and a fully equipped private kitchenette.",
  pricePerNight: 450, // GHS
  maxGuests: 2,
  amenities: [
    "King-sized Bed", "Fast Wi-Fi", "Smart TV (Netflix)", "AC Control", "Mini Bar", "Room Service"
  ],
  images: [
    "https://res.cloudinary.com/demo/image/upload/v1684346857/bedroom-lux.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1684346857/bathroom-lux.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1684346857/living-area-lux.jpg"
  ]
};

// CSS overrides for the DayPicker (to integrate with Dark Luxury theme)
const cssOverrides = `
  .rdp {
    --rdp-cell-size: 40px;
    --rdp-accent-color: var(--color-gold);
    --rdp-background-color: var(--color-obsidian);
    margin: 0;
  }
  .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
    background-color: var(--rdp-accent-color);
    color: var(--color-obsidian);
  }
`;

export default function ApartmentPage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>();

  return (
    <main>
      <style>{cssOverrides}</style>
      
      {/* Navigation Header */}
      <nav className="container" style={{ padding: "var(--spacing-md) var(--spacing-sm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--color-obsidian)" }}>Ferd's</Link>
        <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
          <Link href="/apartment" className="label-caps" style={{ color: "var(--color-obsidian)", borderBottom: "1px solid var(--color-gold)" }}>Apartment</Link>
          <Link href="/cars" className="label-caps" style={{ color: "var(--color-obsidian)" }}>Cars</Link>
        </div>
      </nav>

      <div className="container" style={{ padding: "var(--spacing-md) var(--spacing-sm)"}}>
        
        {/* Header */}
        <div style={{ marginBottom: "var(--spacing-md)" }}>
          <h1 style={{ fontSize: "3.5rem" }}>{MOCK_ROOM.name}</h1>
          <p className="label-caps" style={{ color: "var(--color-obsidian)", opacity: 0.8 }}>Ho, Volta Region</p>
        </div>

        {/* Gallery */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--spacing-sm)", height: "500px", marginBottom: "var(--spacing-lg)" }}>
          <div style={{ position: "relative", backgroundColor: "var(--color-linen)" }}>
             <Image src={MOCK_ROOM.images[0]} alt="Suite Main View" fill style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "var(--spacing-sm)" }}>
            <div style={{ position: "relative", backgroundColor: "var(--color-linen)" }}>
              <Image src={MOCK_ROOM.images[1]} alt="Suite Detail 1" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ position: "relative", backgroundColor: "var(--color-linen)" }}>
               <Image src={MOCK_ROOM.images[2]} alt="Suite Detail 2" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* Main Content Split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "var(--spacing-lg)", alignItems: "start" }}>
          
          {/* Left Column: Details */}
          <div>
            <div style={{ paddingBottom: "var(--spacing-md)", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-md)" }}>
              <h2 style={{ fontSize: "2rem" }}>About this Space</h2>
              <p style={{ fontSize: "1.1rem" }}>{MOCK_ROOM.description}</p>
            </div>

            <div style={{ paddingBottom: "var(--spacing-md)", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-md)" }}>
               <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-sm)" }}>Amenities</h3>
               <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", listStyle: "none" }}>
                  {MOCK_ROOM.amenities.map((item, idx) => (
                    <li key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ color: "var(--color-gold)" }}>✦</span> {item}
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="thin-border" style={{ padding: "var(--spacing-md)", position: "sticky", top: "2rem", backgroundColor: "var(--color-ivory)" }}>
            <div style={{ marginBottom: "var(--spacing-md)", display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
              <span style={{ fontSize: "2rem", fontFamily: "var(--font-serif)" }}>GHS {MOCK_ROOM.pricePerNight}</span>
              <span style={{ opacity: 0.6 }}>/ night</span>
            </div>

            <div style={{ marginBottom: "var(--spacing-md)" }}>
               <p className="label-caps" style={{ marginBottom: "var(--spacing-xs)" }}>Select Dates</p>
               <div className="thin-border" style={{ padding: "var(--spacing-xs)", backgroundColor: "var(--color-linen)" }}>
                 <DayPicker 
                    mode="multiple" 
                    selected={selectedDates} 
                    onSelect={setSelectedDates} 
                    disabled={[{ before: new Date() }]} // Past dates blocked
                 />
               </div>
            </div>

            <button className="btn btn-primary" style={{ width: "100%", fontSize: "1rem" }} disabled={!selectedDates || selectedDates.length === 0}>
              {selectedDates && selectedDates.length > 0 ? `Book ${selectedDates.length} Nights` : "Select Dates"}
            </button>
            <p style={{ textAlign: "center", fontSize: "0.8rem", opacity: 0.6, marginTop: "var(--spacing-sm)" }}>You won't be charged yet.</p>
          </div>
          
        </div>
      </div>
      
      {/* Footer */}
      <footer className="container" style={{ padding: "var(--spacing-md) var(--spacing-sm)", textAlign: "center", borderTop: "0.5px solid var(--color-champagne)", marginTop: "var(--spacing-xl)" }}>
         <p style={{ opacity: 0.7 }}>&copy; {new Date().getFullYear()} Ferd's Luxury Rentals.</p>
      </footer>
    </main>
  );
}
