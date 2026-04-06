"use client";

import { useState } from "react";
import { updateBookingStatus } from "./actions";

interface StatusBadgeProps {
  bookingId: string;
  initialStatus: string;
}

export default function StatusBadge({ bookingId, initialStatus }: StatusBadgeProps) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (newStatus: string) => {
    setLoading(true);
    const result = await updateBookingStatus(bookingId, newStatus);
    if (!result.success) {
      alert("Failed to update status");
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return { bg: "#fef3c7", text: "#92400e" }; // Amber
      case "CONFIRMED": return { bg: "#d1fae5", text: "#065f46" }; // Emerald
      case "COMPLETED": return { bg: "#e0e7ff", text: "#3730a3" }; // Indigo
      case "CANCELLED": return { bg: "#fee2e2", text: "#991b1b" }; // Red
      default: return { bg: "#f3f4f6", text: "#374151" };
    }
  };

  const { bg, text } = getStatusColor(initialStatus);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span className="label-caps" style={{ 
        fontSize: "0.6rem", 
        padding: "2px 6px", 
        borderRadius: "4px", 
        backgroundColor: bg,
        color: text
      }}>
        {initialStatus}
      </span>
      
      {initialStatus === "PENDING" && (
        <button 
          onClick={() => handleUpdate("CONFIRMED")} 
          disabled={loading}
          style={{ fontSize: "0.7rem", padding: "2px 4px", cursor: "pointer", border: "0.5px solid var(--color-gold)", background: "none" }}
        >
          {loading ? "..." : "Confirm"}
        </button>
      )}

      {initialStatus === "CONFIRMED" && (
        <button 
          onClick={() => handleUpdate("COMPLETED")} 
          disabled={loading}
          style={{ fontSize: "0.7rem", padding: "2px 4px", cursor: "pointer", border: "0.5px solid var(--color-gold)", background: "none" }}
        >
          {loading ? "..." : "Complete"}
        </button>
      )}
    </div>
  );
}
