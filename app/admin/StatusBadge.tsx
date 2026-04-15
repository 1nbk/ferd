"use client";

import { useState } from "react";
import { updateBookingStatus } from "./actions";

interface StatusBadgeProps {
  bookingId: string;
  initialStatus: string;
}

export default function StatusBadge({ bookingId, initialStatus }: StatusBadgeProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (newStatus: string) => {
    setLoading(true);
    const result = await updateBookingStatus(bookingId, newStatus);
    if (result.success) {
      setStatus(newStatus);
    } else {
      alert("Failed to update status");
    }
    setLoading(false);
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case "PENDING":               return { bg: "rgba(254,243,199,0.15)", text: "#fbbf24", border: "rgba(251,191,36,0.3)" };
      case "CONFIRMED":             return { bg: "rgba(209,250,229,0.15)", text: "#34d399", border: "rgba(52,211,153,0.3)" };
      case "COMPLETED":             return { bg: "rgba(224,231,255,0.15)", text: "#818cf8", border: "rgba(129,140,248,0.3)" };
      case "CANCELLED":             return { bg: "rgba(254,226,226,0.15)", text: "#f87171", border: "rgba(248,113,113,0.3)" };
      case "REFUNDED":              return { bg: "rgba(226,232,240,0.15)", text: "#94a3b8", border: "rgba(148,163,184,0.3)" };
      case "CONFLICT_NEEDS_REFUND": return { bg: "rgba(254,202,202,0.2)",  text: "#ef4444", border: "rgba(239,68,68,0.5)" };
      default:                      return { bg: "rgba(243,244,246,0.1)",   text: "#9ca3af", border: "rgba(156,163,175,0.3)" };
    }
  };

  const { bg, text, border } = getStatusColor(status);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <span style={{ 
        fontSize: "0.6rem",
        fontFamily: "var(--font-sans)",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        padding: "3px 8px", 
        borderRadius: "3px", 
        backgroundColor: bg,
        color: text,
        border: `0.5px solid ${border}`,
        width: "max-content"
      }}>
        {status.replace("_", " ")}
      </span>
      
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
        {status === "PENDING" && (
          <button 
            onClick={() => handleUpdate("CONFIRMED")} 
            disabled={loading}
            style={{ fontSize: "0.65rem", padding: "2px 6px", cursor: "pointer", border: "0.5px solid #34d399", background: "none", color: "#34d399", borderRadius: "2px" }}
          >
            {loading ? "..." : "Confirm"}
          </button>
        )}
        {status === "CONFIRMED" && (
          <button 
            onClick={() => handleUpdate("COMPLETED")} 
            disabled={loading}
            style={{ fontSize: "0.65rem", padding: "2px 6px", cursor: "pointer", border: "0.5px solid #818cf8", background: "none", color: "#818cf8", borderRadius: "2px" }}
          >
            {loading ? "..." : "Complete"}
          </button>
        )}
        {status === "CONFLICT_NEEDS_REFUND" && (
          <button 
            onClick={() => handleUpdate("REFUNDED")} 
            disabled={loading}
            style={{ fontSize: "0.65rem", padding: "2px 6px", cursor: "pointer", border: "0.5px solid #ef4444", background: "none", color: "#ef4444", borderRadius: "2px" }}
          >
            {loading ? "..." : "Mark Refunded"}
          </button>
        )}
        {(status === "PENDING" || status === "CONFIRMED") && (
          <button 
            onClick={() => handleUpdate("CANCELLED")} 
            disabled={loading}
            style={{ fontSize: "0.65rem", padding: "2px 6px", cursor: "pointer", border: "0.5px solid rgba(248,113,113,0.4)", background: "none", color: "#f87171", borderRadius: "2px" }}
          >
            {loading ? "..." : "Cancel"}
          </button>
        )}
      </div>
    </div>
  );
}
