"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StatusPoller({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Animation effect
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    // Polling logic
    const poll = async () => {
      try {
        const res = await fetch(`/api/bookings/${bookingId}/status`);
        const data = await res.json();
        
        if (data.status === "CONFIRMED") {
          router.refresh(); // Tells Next.js to re-fetch the server component page
        }
      } catch (e) {
        console.error("Polling error:", e);
      }
    };

    const pollInterval = setInterval(poll, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(pollInterval);
    };
  }, [bookingId, router]);

  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ display: "inline-block", width: "12px", height: "12px", border: "2px solid var(--color-gold)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", marginRight: "10px" }} />
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      <span style={{ fontSize: "0.9rem", color: "var(--color-gold)", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        Verifying Payment{dots}
      </span>
    </div>
  );
}
