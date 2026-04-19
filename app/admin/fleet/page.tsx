import { prisma } from "@/lib/prisma";
import StatusBadge from "../StatusBadge";
import FleetBlockForm from "./FleetBlockForm";
import { Car, TrendingUp, Users, CalendarX } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Fleet Management | Ferd's Admin" };

export default async function FleetAdminPage() {
  const cars = await prisma.car.findMany({
    include: {
      bookings: { include: { guest: true }, orderBy: { createdAt: "desc" } },
      blockedDates: { orderBy: { date: "asc" } },
    },
  });

  const allCarBookings = cars.flatMap((c) => c.bookings);
  const totalRevenue = allCarBookings.reduce((acc, b) => acc + b.totalPrice, 0);
  const confirmed = allCarBookings.filter((b) => b.status === "CONFIRMED").length;
  const upcoming = allCarBookings.filter((b) => new Date(b.checkIn) >= new Date()).length;

  const cardStyle = {
    backgroundColor: "rgba(255,255,255,0.03)",
    border: "0.5px solid rgba(139,111,71,0.2)",
    padding: "1.5rem",
  } as const;

  return (
    <div style={{ padding: "2.5rem", minHeight: "100vh", backgroundColor: "#0F0D0A" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ color: "rgba(201,168,122,0.5)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.25em", fontFamily: "var(--font-sans)", marginBottom: "0.5rem" }}>
          Fleet Management
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--color-ivory)", fontWeight: 400, margin: 0 }}>
          The Fleet
        </h1>
        <p style={{ color: "rgba(201,168,122,0.4)", fontSize: "0.85rem", fontFamily: "var(--font-sans)", marginTop: "0.5rem" }}>
          {cars.length} vehicle{cars.length !== 1 ? "s" : ""} in the collection
        </p>
      </div>

      {/* Overview Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {[
          { label: "Total Revenue", value: `GHS ${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "#C9A87A" },
          { label: "Total Rentals", value: allCarBookings.length, icon: Car, color: "#8B6F47" },
          { label: "Confirmed", value: confirmed, icon: Users, color: "#7C9B8A" },
          { label: "Upcoming", value: upcoming, icon: CalendarX, color: "#9B8A7C" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <p style={{ color: "rgba(201,168,122,0.5)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "var(--font-sans)" }}>{label}</p>
              <Icon size={15} color={color} style={{ opacity: 0.7 }} />
            </div>
            <p style={{ fontSize: "1.75rem", fontFamily: "var(--font-serif)", color: "var(--color-ivory)", fontWeight: 400, lineHeight: 1 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Per-Car sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {cars.map((car) => (
          <div key={car.id} style={{ border: "0.5px solid rgba(139,111,71,0.2)", overflow: "hidden" }}>
            {/* Car Header */}
            <div style={{ padding: "1.25rem 1.5rem", backgroundColor: "rgba(139,111,71,0.06)", borderBottom: "0.5px solid rgba(139,111,71,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--color-ivory)", fontWeight: 400, margin: 0 }}>{car.name}</h2>
                <p style={{ color: "rgba(201,168,122,0.5)", fontSize: "0.75rem", fontFamily: "var(--font-sans)", marginTop: "2px" }}>{car.model} · GHS {car.pricePerDay.toLocaleString()}/day</p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {car.features.map((f) => (
                  <span key={f} style={{ padding: "3px 8px", border: "0.5px solid rgba(139,111,71,0.3)", color: "rgba(201,168,122,0.6)", fontSize: "0.7rem", fontFamily: "var(--font-sans)" }}>{f}</span>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px" }}>
              {/* Bookings table */}
              <div style={{ overflowX: "auto", borderRight: "0.5px solid rgba(139,111,71,0.15)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
                  <thead>
                    <tr style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                      {["Guest", "Check-in", "Check-out", "Days", "Total", "Status"].map((h) => (
                        <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", color: "rgba(201,168,122,0.4)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 400 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {car.bookings.length === 0 ? (
                      <tr><td colSpan={6} style={{ padding: "2.5rem", textAlign: "center", color: "rgba(201,168,122,0.25)", fontFamily: "var(--font-serif)", fontSize: "1rem" }}>No rentals yet.</td></tr>
                    ) : car.bookings.map((b) => {
                      const days = Math.round((new Date(b.checkOut).getTime() - new Date(b.checkIn).getTime()) / 86400000);
                      return (
                        <tr key={b.id} style={{ borderBottom: "0.5px solid rgba(139,111,71,0.08)" }}>
                          <td style={{ padding: "0.875rem 1rem" }}>
                            <p style={{ color: "var(--color-ivory)", fontSize: "0.8rem" }}>{b.guest.name}</p>
                            <p style={{ color: "rgba(201,168,122,0.35)", fontSize: "0.7rem", marginTop: "1px" }}>{b.guest.email}</p>
                          </td>
                          <td style={{ padding: "0.875rem 1rem", color: "rgba(245,239,230,0.6)", fontSize: "0.75rem" }}>
                            {new Date(b.checkIn).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </td>
                          <td style={{ padding: "0.875rem 1rem", color: "rgba(245,239,230,0.6)", fontSize: "0.75rem" }}>
                            {new Date(b.checkOut).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </td>
                          <td style={{ padding: "0.875rem 1rem", color: "rgba(245,239,230,0.6)", fontSize: "0.75rem" }}>{days}d</td>
                          <td style={{ padding: "0.875rem 1rem", color: "var(--color-ivory)", fontSize: "0.8rem", fontWeight: 500 }}>GHS {b.totalPrice.toLocaleString()}</td>
                          <td style={{ padding: "0.875rem 1rem" }}><StatusBadge bookingId={b.id} initialStatus={b.status} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Block Dates panel */}
              <div style={{ padding: "1.25rem", backgroundColor: "rgba(255,255,255,0.01)" }}>
                <p style={{ color: "rgba(201,168,122,0.5)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "var(--font-sans)", marginBottom: "1rem" }}>Block Dates</p>
                <FleetBlockForm carId={car.id} />
                {car.blockedDates.length > 0 && (
                  <div style={{ marginTop: "1rem", borderTop: "0.5px solid rgba(139,111,71,0.15)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <p style={{ color: "rgba(201,168,122,0.35)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-sans)", marginBottom: "0.25rem" }}>Blocked</p>
                    {car.blockedDates.map((d) => (
                      <div key={d.id} style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "rgba(245,239,230,0.55)", fontSize: "0.75rem", fontFamily: "var(--font-sans)" }}>
                          {new Date(d.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        {d.reason && <span style={{ color: "rgba(201,168,122,0.35)", fontSize: "0.7rem", fontFamily: "var(--font-sans)" }}>{d.reason}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
