"use client";

import { useState } from "react";
import StatusBadge from "./StatusBadge";
import VerifyIdButton from "./VerifyIdButton";
import { Search } from "lucide-react";

export default function AdminBookingsTable({ initialBookings }: { initialBookings: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = initialBookings.filter(booking => {
    const searchStr = `${booking.guest.name} ${booking.guest.email} ${booking.id}`.toLowerCase();
    return searchStr.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      {/* Search Bar */}
      <div style={{
        padding: "1rem 1.5rem",
        borderBottom: "0.5px solid rgba(139, 111, 71, 0.15)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "rgba(255,255,255,0.01)"
      }}>
        <Search size={16} color="rgba(201, 168, 122, 0.5)" />
        <input 
          type="text" 
          placeholder="Search by guest name, email, or booking ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            background: "none",
            border: "none",
            color: "var(--color-ivory)",
            fontSize: "0.85rem",
            width: "100%",
            outline: "none",
            fontFamily: "var(--font-sans)"
          }}
        />
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
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={7} style={{
                  padding: "4rem",
                  textAlign: "center",
                  color: "rgba(201, 168, 122, 0.3)",
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                }}>
                  {searchTerm ? "No matching reservations found." : "No reservations recorded yet."}
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
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
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {booking.guest.idNumber && (
                        <span style={{ fontSize: "0.8rem", color: "var(--color-gold)", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                            {booking.guest.idNumber}
                        </span>
                        )}
                        {booking.guest.idDocumentUrl ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <a 
                                href={booking.guest.idDocumentUrl} 
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
                                display: "inline-block",
                                width: "max-content"
                                }}
                            >
                                View ID Image
                            </a>
                            <VerifyIdButton guestId={booking.guestId} isVerified={booking.guest.idVerified} />
                            </div>
                        ) : (
                        <span style={{ fontSize: "0.75rem", opacity: 0.5, color: "var(--color-ivory)" }}>No Image</span>
                        )}
                    </div>
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
    </>
  );
}
