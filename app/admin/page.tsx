import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import BlockDatesWidget from "./BlockDatesWidget";
import AdminBookingsTable from "./AdminBookingsTable";
import { deleteBlockedDate } from "./actions";
import { CalendarDays, TrendingUp, Car, Building2, Trash2 } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  const bookings = await prisma.booking.findMany({
    include: {
      guest: true,
      room: true,
      car: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const rooms = await prisma.room.findMany({ select: { id: true, name: true } });
  const cars = await prisma.car.findMany({ select: { id: true, name: true } });
  
  const blockedDates = await prisma.blockedDate.findMany({
    include: {
      room: true,
      car: true,
    },
    orderBy: {
      date: "asc"
    },
    where: {
      date: { gte: new Date() } // Only show future blocks
    }
  });

  // Group blocked dates by resource and range for cleaner display
  // For now, let's keep it simple and just list them.

  const totalRevenue = bookings
    .filter((b) => b.status === "CONFIRMED" || b.status === "COMPLETED")
    .reduce((acc: number, b) => acc + b.totalPrice, 0);
  const apartmentBookings = bookings.filter((b) => b.room !== null).length;
  const carBookings = bookings.filter((b) => b.car !== null).length;
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED").length;
  const conflictBookings = bookings.filter((b) => b.status === "CONFLICT_NEEDS_REFUND").length;

  const stats = [
    { label: "Total Revenue", value: `GHS ${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "#C9A87A" },
    { label: "All Bookings", value: bookings.length, icon: CalendarDays, color: "#8B6F47" },
    { label: "Apartment Stays", value: apartmentBookings, icon: Building2, color: "#7C9B8A" },
    { label: "Car Rentals", value: carBookings, icon: Car, color: "#8A7C9B" },
  ];

  return (
    <div style={{ padding: "2.5rem", minHeight: "100vh", backgroundColor: "#0F0D0A" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{
          color: "rgba(201, 168, 122, 0.5)",
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          fontFamily: "var(--font-sans)",
          marginBottom: "0.5rem",
        }}>
          Welcome back, {session?.user?.email?.split("@")[0]}
        </p>
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "2rem",
          color: "var(--color-ivory)",
          fontWeight: 400,
          margin: 0,
        }}>
          Dashboard Overview
        </h1>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        marginBottom: "2.5rem",
      }}>
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "0.5px solid rgba(139, 111, 71, 0.2)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <p style={{
                color: "rgba(201, 168, 122, 0.5)",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontFamily: "var(--font-sans)",
              }}>
                {label}
              </p>
              <Icon size={16} color={color} style={{ opacity: 0.7 }} />
            </div>
            <p style={{
              fontSize: "1.75rem",
              fontFamily: "var(--font-serif)",
              color: "var(--color-ivory)",
              fontWeight: 400,
              lineHeight: 1,
            }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Block Dates Widget */}
      <BlockDatesWidget rooms={rooms} cars={cars} />

      {/* active blocks list */}
      {blockedDates.length > 0 && (
        <div style={{ marginBottom: "2.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--color-gold)", marginBottom: "1rem" }}>
            Current Maintenance Blocks
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px" }}>
            {blockedDates.map(block => (
              <div key={block.id} style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(139, 111, 71, 0.2)",
                padding: "0.75rem 1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-ivory)" }}>
                    {block.room ? block.room.name : block.car?.name}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(201, 168, 122, 0.6)" }}>
                    {new Date(block.date).toLocaleDateString("en-GB")} {block.reason ? `- ${block.reason}` : ""}
                  </p>
                </div>
                <form action={async () => {
                   "use server";
                   await deleteBlockedDate(block.id);
                }}>
                  <button type="submit" style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171", padding: "5px" }}>
                    <Trash2 size={14} />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conflict Alert Banner */}
      {conflictBookings > 0 && (
        <div style={{
          marginBottom: "2rem",
          padding: "1rem 1.5rem",
          backgroundColor: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.3)",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}>
          <span style={{ fontSize: "1.2rem" }}>🚨</span>
          <div>
            <p style={{ color: "#ef4444", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>
              {conflictBookings} booking{conflictBookings > 1 ? "s" : ""} require{conflictBookings === 1 ? "s" : ""} a refund
            </p>
            <p style={{ color: "rgba(239,68,68,0.7)", fontFamily: "var(--font-sans)", fontSize: "0.75rem", margin: 0 }}>
              A payment was collected for dates already booked by someone else. Please issue a refund on Paystack and click "Mark Refunded" below.
            </p>
          </div>
        </div>
      )}

      {/* Bookings Table container */}
      <div style={{
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "0.5px solid rgba(139, 111, 71, 0.2)",
        overflow: "hidden",
      }}>
        <div style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "0.5px solid rgba(139, 111, 71, 0.15)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.25rem",
            color: "var(--color-ivory)",
            fontWeight: 400,
            margin: 0,
          }}>
            Recent Reservations
          </h2>
          <span style={{
            color: "rgba(201, 168, 122, 0.5)",
            fontSize: "0.7rem",
            fontFamily: "var(--font-sans)",
          }}>
            {confirmedBookings} confirmed
          </span>
        </div>

        <AdminBookingsTable initialBookings={bookings} />
      </div>
    </div>
  );
}
