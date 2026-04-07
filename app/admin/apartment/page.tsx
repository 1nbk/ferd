import { prisma } from "@/lib/prisma";
import StatusBadge from "../StatusBadge";
import BlockDateForm from "./BlockDateForm";
import { Building2, CalendarX, TrendingUp, Users } from "lucide-react";

export const metadata = { title: "Apartment Management | Ferd's Admin" };

export default async function ApartmentAdminPage() {
  const room = await prisma.room.findFirst();
  const bookings = await prisma.booking.findMany({
    where: { roomId: { not: null } },
    include: { guest: true, room: true },
    orderBy: { createdAt: "desc" },
  });
  const blockedDates = await prisma.blockedDate.findMany({
    where: { roomId: { not: null } },
    orderBy: { date: "asc" },
  });

  const totalRevenue = bookings.reduce((acc, b) => acc + b.totalPrice, 0);
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED").length;
  const upcoming = bookings.filter((b) => new Date(b.checkIn) >= new Date()).length;

  const cardStyle = {
    backgroundColor: "rgba(255,255,255,0.03)",
    border: "0.5px solid rgba(139, 111, 71, 0.2)",
    padding: "1.5rem",
  } as const;

  return (
    <div style={{ padding: "2.5rem", minHeight: "100vh", backgroundColor: "#0F0D0A" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ color: "rgba(201,168,122,0.5)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.25em", fontFamily: "var(--font-sans)", marginBottom: "0.5rem" }}>
          Apartment Management
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--color-ivory)", fontWeight: 400, margin: 0 }}>
          {room?.name ?? "The Platinum Penthouse"}
        </h1>
        <p style={{ color: "rgba(201,168,122,0.4)", fontSize: "0.85rem", fontFamily: "var(--font-sans)", marginTop: "0.5rem" }}>
          GHS {room?.pricePerNight?.toLocaleString()} / night · Up to {room?.maxGuests} guests
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {[
          { label: "Total Revenue", value: `GHS ${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "#C9A87A" },
          { label: "Total Stays", value: bookings.length, icon: Building2, color: "#8B6F47" },
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem", alignItems: "start" }}>
        {/* Bookings Table */}
        <div style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(139,111,71,0.2)", overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "0.5px solid rgba(139,111,71,0.15)" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--color-ivory)", fontWeight: 400, margin: 0 }}>Apartment Reservations</h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
              <thead>
                <tr style={{ backgroundColor: "rgba(139,111,71,0.06)" }}>
                  {["Guest", "Check-in", "Check-out", "Nights", "Total", "Status"].map((h) => (
                    <th key={h} style={{ padding: "0.875rem 1.25rem", textAlign: "left", color: "rgba(201,168,122,0.5)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr><td colSpan={6} style={{ padding: "4rem", textAlign: "center", color: "rgba(201,168,122,0.3)", fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}>No apartment bookings yet.</td></tr>
                ) : bookings.map((b) => {
                  const nights = Math.round((new Date(b.checkOut).getTime() - new Date(b.checkIn).getTime()) / 86400000);
                  return (
                    <tr key={b.id} style={{ borderBottom: "0.5px solid rgba(139,111,71,0.1)" }}>
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <p style={{ color: "var(--color-ivory)", fontSize: "0.875rem" }}>{b.guest.name}</p>
                        <p style={{ color: "rgba(201,168,122,0.4)", fontSize: "0.75rem", marginTop: "2px" }}>{b.guest.email}</p>
                      </td>
                      <td style={{ padding: "1rem 1.25rem", color: "rgba(245,239,230,0.7)", fontSize: "0.8rem" }}>
                        {new Date(b.checkIn).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td style={{ padding: "1rem 1.25rem", color: "rgba(245,239,230,0.7)", fontSize: "0.8rem" }}>
                        {new Date(b.checkOut).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td style={{ padding: "1rem 1.25rem", color: "rgba(245,239,230,0.7)", fontSize: "0.8rem" }}>{nights}n</td>
                      <td style={{ padding: "1rem 1.25rem", color: "var(--color-ivory)", fontSize: "0.875rem", fontWeight: 500 }}>GHS {b.totalPrice.toLocaleString()}</td>
                      <td style={{ padding: "1rem 1.25rem" }}><StatusBadge bookingId={b.id} initialStatus={b.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar: Amenities + Block Dates */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Amenities */}
          <div style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p style={{ color: "rgba(201,168,122,0.5)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "var(--font-sans)" }}>Amenities</p>
            {(room?.amenities ?? []).map((a) => (
              <div key={a} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "var(--color-gold)", flexShrink: 0 }} />
                <span style={{ color: "rgba(245,239,230,0.7)", fontSize: "0.8rem", fontFamily: "var(--font-sans)" }}>{a}</span>
              </div>
            ))}
          </div>

          {/* Block Dates */}
          <div style={cardStyle}>
            <p style={{ color: "rgba(201,168,122,0.5)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "var(--font-sans)", marginBottom: "1rem" }}>Block Dates</p>
            <BlockDateForm resourceId={room?.id ?? ""} resourceType="room" />
            {blockedDates.length > 0 && (
              <div style={{ marginTop: "1rem", borderTop: "0.5px solid rgba(139,111,71,0.15)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p style={{ color: "rgba(201,168,122,0.4)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-sans)", marginBottom: "0.25rem" }}>Blocked</p>
                {blockedDates.map((d) => (
                  <div key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "rgba(245,239,230,0.6)", fontSize: "0.8rem", fontFamily: "var(--font-sans)" }}>
                      {new Date(d.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    {d.reason && <span style={{ color: "rgba(201,168,122,0.4)", fontSize: "0.7rem", fontFamily: "var(--font-sans)" }}>{d.reason}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
