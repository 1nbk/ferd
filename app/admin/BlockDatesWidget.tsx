"use client";

import { useState } from "react";
import { blockDates } from "./actions";
import { Plus, X } from "lucide-react";

interface Resource {
  id: string;
  name: string;
}

interface BlockDatesWidgetProps {
  rooms: Resource[];
  cars: Resource[];
}

export default function BlockDatesWidget({ rooms, cars }: BlockDatesWidgetProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [formData, setFormData] = useState({
    type: "room" as "room" | "car",
    resourceId: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.resourceId || !formData.startDate || !formData.endDate) {
      setMessage({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    setLoading(true);
    setMessage(null);

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    const datesToBlock: Date[] = [];
    let current = new Date(start);
    while (current <= end) {
      datesToBlock.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    try {
      // Block all dates concurrently instead of one by one
      await Promise.all(
        datesToBlock.map((d) =>
          blockDates({
            roomId: formData.type === "room" ? formData.resourceId : undefined,
            carId: formData.type === "car" ? formData.resourceId : undefined,
            date: d,
            reason: formData.reason,
          })
        )
      );

      setFormData({ type: "room", resourceId: "", startDate: "", endDate: "", reason: "" });
      setMessage({ type: "success", text: `${datesToBlock.length} date${datesToBlock.length > 1 ? "s" : ""} successfully blocked.` });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const selectedResources = formData.type === "room" ? rooms : cars;

  return (
    <div style={{
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "0.5px solid rgba(139, 111, 71, 0.2)",
      padding: "1.5rem",
      color: "var(--color-ivory)",
      fontFamily: "var(--font-sans)",
      marginBottom: "2.5rem"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
        <Plus size={20} color="var(--color-gold)" />
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, margin: 0 }}>
          Manage Blackout Dates
        </h2>
      </div>

      <form onSubmit={handleSubmit} style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
        alignItems: "end"
      }}>
        {/* Type Selection */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(201,168,122,0.5)" }}>
            Resource Type
          </label>
          <select 
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as any, resourceId: "" })}
            style={{ 
              backgroundColor: "rgba(255,255,255,0.05)", 
              border: "0.5px solid rgba(139, 111, 71, 0.2)", 
              color: "var(--color-ivory)",
              padding: "10px",
              outline: "none"
            }}
          >
            <option value="room">Apartment</option>
            <option value="car">Car Fleet</option>
          </select>
        </div>

        {/* Resource Selection */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(201,168,122,0.5)" }}>
            Select {formData.type === "room" ? "Unit" : "Car"}
          </label>
          <select 
            value={formData.resourceId}
            onChange={(e) => setFormData({ ...formData, resourceId: e.target.value })}
            style={{ 
              backgroundColor: "rgba(255,255,255,0.05)", 
              border: "0.5px solid rgba(139, 111, 71, 0.2)", 
              color: "var(--color-ivory)",
              padding: "10px",
              outline: "none"
            }}
          >
            <option value="">-- Choose --</option>
            {selectedResources.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(201,168,122,0.5)" }}>
            Start Date
          </label>
          <input 
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            style={{ 
              backgroundColor: "rgba(255,255,255,0.05)", 
              border: "0.5px solid rgba(139, 111, 71, 0.2)", 
              color: "var(--color-ivory)",
              padding: "10px",
              outline: "none"
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(201,168,122,0.5)" }}>
            End Date
          </label>
          <input 
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            style={{ 
              backgroundColor: "rgba(255,255,255,0.05)", 
              border: "0.5px solid rgba(139, 111, 71, 0.2)", 
              color: "var(--color-ivory)",
              padding: "10px",
              outline: "none"
            }}
          />
        </div>

        {/* Reason */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(201,168,122,0.5)" }}>
            Reason (Maintenance, etc)
          </label>
          <input 
            type="text"
            placeholder="e.g. Deep Cleaning"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            style={{ 
              backgroundColor: "rgba(255,255,255,0.05)", 
              border: "0.5px solid rgba(139, 111, 71, 0.2)", 
              color: "var(--color-ivory)",
              padding: "10px",
              outline: "none"
            }}
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{
            padding: "12px",
            border: "none",
            backgroundColor: "var(--color-gold)",
            color: "var(--color-obsidian)",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontSize: "0.75rem"
          }}
        >
          {loading ? "Processing..." : "Block Dates"}
        </button>
      </form>

      {message && (
        <p style={{
          marginTop: "1rem",
          fontSize: "0.8rem",
          fontFamily: "var(--font-sans)",
          padding: "10px 14px",
          color: message.type === "success" ? "#86efac" : "#fca5a5",
          backgroundColor: message.type === "success" ? "rgba(134,239,172,0.08)" : "rgba(252,165,165,0.08)",
          border: `0.5px solid ${message.type === "success" ? "rgba(134,239,172,0.2)" : "rgba(252,165,165,0.2)"}`,
        }}>
          {message.text}
        </p>
      )}
    </div>
  );
}
