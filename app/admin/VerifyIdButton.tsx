"use client";

import { useState } from "react";
import { verifyGuestId } from "./actions";
import { Check } from "lucide-react";

export default function VerifyIdButton({ guestId, isVerified }: { guestId: string, isVerified: boolean }) {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(isVerified);

  const handleVerify = async () => {
    if (verified) return;
    setLoading(true);
    const res = await verifyGuestId(guestId);
    if (res.success) {
      setVerified(true);
    } else {
      alert("Failed to verify ID");
    }
    setLoading(false);
  };

  if (verified) {
    return (
      <span style={{ 
        fontSize: "0.65rem", 
        color: "#10b981", 
        display: "flex", 
        alignItems: "center", 
        gap: "4px",
        fontFamily: "var(--font-sans)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontWeight: 600
      }}>
        <Check size={12} /> Verified
      </span>
    );
  }

  return (
    <button 
      onClick={handleVerify}
      disabled={loading}
      style={{
        backgroundColor: "transparent",
        border: "0.5px solid var(--color-gold)",
        color: "var(--color-gold)",
        fontSize: "0.65rem",
        padding: "2px 6px",
        cursor: loading ? "not-allowed" : "pointer",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        borderRadius: "2px",
        transition: "all 0.2s"
      }}
    >
      {loading ? "..." : "Verify ID"}
    </button>
  );
}
