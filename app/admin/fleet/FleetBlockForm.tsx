"use client";

import { useState } from "react";
import { blockCarDate } from "./actions";

export default function FleetBlockForm({ carId }: { carId: string }) {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date) return;
    setLoading(true);
    setMessage(null);

    const result = await blockCarDate(carId, date, reason);

    setLoading(false);
    if (result.success) {
      setMessage({ type: "success", text: "Date blocked." });
      setDate("");
      setReason("");
    } else {
      setMessage({ type: "error", text: result.error ?? "Failed." });
    }
  }

  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "0.5px solid rgba(139,111,71,0.35)",
    color: "var(--color-ivory)",
    padding: "9px 11px",
    width: "100%",
    fontSize: "0.8rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
  } as const;

  const labelStyle = {
    display: "block",
    color: "rgba(201,168,122,0.45)",
    fontSize: "0.6rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.15em",
    marginBottom: "5px",
    fontFamily: "var(--font-sans)",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
      <div>
        <label style={labelStyle}>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Reason (optional)</label>
        <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Servicing" style={inputStyle} />
      </div>

      {message && (
        <p style={{
          fontSize: "0.7rem",
          fontFamily: "var(--font-sans)",
          color: message.type === "success" ? "#86efac" : "#fca5a5",
          padding: "6px 8px",
          backgroundColor: message.type === "success" ? "rgba(134,239,172,0.08)" : "rgba(252,165,165,0.08)",
          border: `0.5px solid ${message.type === "success" ? "rgba(134,239,172,0.2)" : "rgba(252,165,165,0.2)"}`,
        }}>
          {message.text}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "9px",
          backgroundColor: loading ? "rgba(139,111,71,0.4)" : "var(--color-gold)",
          color: "var(--color-obsidian)",
          border: "none",
          fontFamily: "var(--font-sans)",
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
        }}
      >
        {loading ? "Blocking..." : "Block Date"}
      </button>
    </form>
  );
}
