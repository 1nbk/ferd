import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";

import StatusBadge from "./StatusBadge";

export default async function AdminDashboard() {
  const bookings = await prisma.booking.findMany({
    include: {
      guest: true,
      room: true,
      car: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <main className="container" style={{ padding: "var(--spacing-lg) var(--spacing-sm)" }}>
      {/* Admin Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--spacing-xl)", borderBottom: "0.5px solid var(--color-champagne)", paddingBottom: "var(--spacing-md)" }}>
        <div>
          <BrandLogo variant="light" size="sm" />
          <p style={{ opacity: 0.6, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.5rem" }}>Global Command Center</p>
        </div>
        <Link href="/" className="btn btn-outline">Exit Admin</Link>
      </div>

      {/* Stats Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--spacing-md)", marginBottom: "var(--spacing-xl)" }}>
        <div className="thin-border" style={{ padding: "var(--spacing-md)", backgroundColor: "var(--color-linen)" }}>
          <p className="label-caps" style={{ fontSize: "0.7rem" }}>Total Bookings</p>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{bookings.length}</p>
        </div>
        <div className="thin-border" style={{ padding: "var(--spacing-md)", backgroundColor: "var(--color-linen)" }}>
          <p className="label-caps" style={{ fontSize: "0.7rem" }}>Total Revenue</p>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>GHS {bookings.reduce((acc: number, curr: any) => acc + curr.totalPrice, 0)}</p>
        </div>
      </div>

      {/* Reservations Table */}
      <section>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-md)" }}>Recent Reservations</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-gold)", backgroundColor: "var(--color-linen)" }}>
                <th style={{ padding: "12px" }}>Guest</th>
                <th style={{ padding: "12px" }}>Resource</th>
                <th style={{ padding: "12px" }}>Dates</th>
                <th style={{ padding: "12px" }}>Total</th>
                <th style={{ padding: "12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "var(--spacing-xl)", textAlign: "center", opacity: 0.5 }}>No bookings recorded yet.</td>
                </tr>
              ) : (
                bookings.map((booking: any) => (
                  <tr key={booking.id} style={{ borderBottom: "0.5px solid var(--color-champagne)" }}>
                    <td style={{ padding: "12px" }}>
                      <p style={{ fontWeight: "bold" }}>{booking.guest.name}</p>
                      <p style={{ fontSize: "0.8rem", opacity: 0.6 }}>{booking.guest.email}</p>
                    </td>
                    <td style={{ padding: "12px" }}>
                      {booking.room ? (
                        <span style={{ color: "var(--color-gold)" }}>Apartment: {booking.room.name}</span>
                      ) : booking.car ? (
                        <span style={{ color: "#3b82f6" }}>Car: {booking.car.name}</span>
                      ) : "Unknown"}
                    </td>
                    <td style={{ padding: "12px", fontSize: "0.9rem" }}>
                      {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>GHS {booking.totalPrice}</td>
                    <td style={{ padding: "12px" }}>
                      <StatusBadge bookingId={booking.id} initialStatus={booking.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
