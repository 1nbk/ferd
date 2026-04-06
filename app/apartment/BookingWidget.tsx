"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface BookingWidgetProps {
  pricePerNight: number;
  roomId: string;
}

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

export default function BookingWidget({ pricePerNight, roomId }: BookingWidgetProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>();

  return (
    <div className="thin-border" style={{ padding: "var(--spacing-md)", position: "sticky", top: "2rem", backgroundColor: "var(--color-ivory)" }}>
      <style>{cssOverrides}</style>
      <div style={{ marginBottom: "var(--spacing-md)", display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
        <span style={{ fontSize: "2rem", fontFamily: "var(--font-serif)" }}>GHS {pricePerNight}</span>
        <span style={{ opacity: 0.6 }}>/ night</span>
      </div>

      <div style={{ marginBottom: "var(--spacing-md)" }}>
        <p className="label-caps" style={{ marginBottom: "var(--spacing-xs)" }}>Select Dates</p>
        <div className="thin-border" style={{ padding: "var(--spacing-xs)", backgroundColor: "var(--color-linen)", width: "fit-content" }}>
          <DayPicker 
            mode="multiple" 
            selected={selectedDates} 
            onSelect={setSelectedDates} 
            disabled={[{ before: new Date() }]} 
          />
        </div>
      </div>

      <button className="btn btn-primary" style={{ width: "100%", fontSize: "1rem" }} disabled={!selectedDates || selectedDates.length === 0}>
        {selectedDates && selectedDates.length > 0 ? `Book ${selectedDates.length} Nights` : "Select Dates"}
      </button>
      <p style={{ textAlign: "center", fontSize: "0.8rem", opacity: 0.6, marginTop: "var(--spacing-sm)" }}>You won't be charged yet.</p>
    </div>
  );
}
