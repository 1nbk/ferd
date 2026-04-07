import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import StatusBadge from "./StatusBadge";
import { CalendarDays, TrendingUp, Car, Building2 } from "lucide-react";

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

  const totalRevenue = bookings.reduce((acc: number, b) => acc + b.totalPrice, 0);
  const apartmentBookings = bookings.filter((b) => b.room !== null).length;
  const carBookings = bookings.filter((b) => b.car !== null).length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;

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

      {/* Bookings Table */}
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

        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "var(--font-sans)",
          }}>
            <thead>
              <tr style={{ backgroundColor: "rgba(139, 111, 71, 0.06)" }}>
                {["Guest", "Verification", "Resource", "Check-in", "Check-out", "Total", "Status"].map((h) => (
                  <th key={h} style={{
                    padding: "0.875rem 1.25rem",
                    textAlign: "left",
                    color: "rgba(201, 168, 122, 0.5)",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontWeight: 400,
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{
                    padding: "4rem",
                    textAlign: "center",
                    color: "rgba(201, 168, 122, 0.3)",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.1rem",
                  }}>
                    No reservations recorded yet.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} style={{
                    borderBottom: "0.5px solid rgba(139, 111, 71, 0.1)",
                    transition: "background-color 0.2s ease",
                  }}>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <p style={{ color: "var(--color-ivory)", fontWeight: 400, fontSize: "0.875rem" }}>
                        {booking.guest.name}
                      </p>
                      <p style={{ color: "rgba(201, 168, 122, 0.4)", fontSize: "0.75rem", marginTop: "2px" }}>
                        {booking.guest.email}
                      </p>
                    </td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      {(booking.guest as any).idDocumentUrl ? (
                         <a 
                           href={(booking.guest as any).idDocumentUrl} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           style={{
                             color: "var(--color-ivory)",
                             backgroundColor: "rgba(16, 185, 129, 0.15)",
                             border: "0.5px solid rgba(16, 185, 129, 0.3)",
                             padding: "4px 8px",
                             borderRadius: "2px",
                             fontSize: "0.75rem",
                             textDecoration: "none",
                             display: "inline-block"
                           }}
                         >
                           View ID
                         </a>
                      ) : (
                        <span style={{ fontSize: "0.75rem", opacity: 0.5, color: "var(--color-ivory)" }}>None</span>
                      )}
                    </td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      {booking.room ? (
                        <span style={{
                          color: "var(--color-champagne)",
                          fontSize: "0.8rem",
                          padding: "3px 8px",
                          backgroundColor: "rgba(201, 168, 122, 0.1)",
                          border: "0.5px solid rgba(201, 168, 122, 0.2)",
                        }}>
                          Apartment
                        </span>
                      ) : booking.car ? (
                        <span style={{
                          color: "#93c5fd",
                          fontSize: "0.8rem",
                          padding: "3px 8px",
                          backgroundColor: "rgba(147, 197, 253, 0.1)",
                          border: "0.5px solid rgba(147, 197, 253, 0.2)",
                        }}>
                          {booking.car.name}
                        </span>
                      ) : "—"}
                    </td>
                    <td style={{ padding: "1rem 1.25rem", color: "rgba(245, 239, 230, 0.7)", fontSize: "0.8rem" }}>
                      {new Date(booking.checkIn).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td style={{ padding: "1rem 1.25rem", color: "rgba(245, 239, 230, 0.7)", fontSize: "0.8rem" }}>
                      {new Date(booking.checkOut).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td style={{ padding: "1rem 1.25rem", color: "var(--color-ivory)", fontSize: "0.875rem", fontWeight: 500 }}>
                      GHS {booking.totalPrice.toLocaleString()}
                    </td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <StatusBadge bookingId={booking.id} initialStatus={booking.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
