"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const MAX_POLL_DURATION_MS = 5 * 60 * 1000; // Stop polling after 5 minutes

export default function StatusPoller({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [dots, setDots] = useState("");
  const [timedOut, setTimedOut] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    // Animated dots
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    // Polling logic
    const poll = async () => {
      // Stop polling after 5 minutes
      if (Date.now() - startTime.current > MAX_POLL_DURATION_MS) {
        setTimedOut(true);
        clearInterval(pollInterval);
        return;
      }

      try {
        const res = await fetch(`/api/bookings/${bookingId}/status`);
        const data = await res.json();

        if (data.status === "CONFIRMED") {
          router.refresh();
        }
      } catch (e) {
        console.error("Polling error:", e);
      }
    };

    const pollInterval = setInterval(poll, 3000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(pollInterval);
    };
  }, [bookingId, router]);

  if (timedOut) {
    return (
      <div style={{ marginTop: "1rem", padding: "16px", backgroundColor: "rgba(239,68,68,0.05)", border: "0.5px solid rgba(239,68,68,0.3)" }}>
        <p style={{ fontSize: "0.9rem", color: "#ef4444", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>
          Payment confirmation is taking longer than expected.
        </p>
        <p style={{ fontSize: "0.85rem", opacity: 0.7, fontFamily: "var(--font-sans)" }}>
          If you completed payment, please contact us at{" "}
          <a href="mailto:reservations@ferds.com" style={{ color: "var(--color-gold)" }}>
            reservations@ferds.com
          </a>{" "}
          with your booking reference and we'll confirm manually.
        </p>
      </div>
    );
  }

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
