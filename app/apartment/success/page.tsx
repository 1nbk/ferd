import Link from "next/link";

export default function SuccessPage({ searchParams }: { searchParams: { reference: string; bookingId: string } }) {
  return (
    <main className="container" style={{ padding: "var(--spacing-xl) 0", textAlign: "center" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "var(--spacing-lg)", backgroundColor: "var(--color-linen)", borderRadius: "8px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "var(--spacing-sm)" }}>Reservation Confirmed</h1>
        <p className="label-caps" style={{ color: "var(--color-gold)", marginBottom: "var(--spacing-md)" }}>Thank you for staying with Ferd's</p>
        
        <div style={{ textAlign: "left", padding: "var(--spacing-md)", borderTop: "0.5px solid var(--color-gold)", borderBottom: "0.5px solid var(--color-gold)", marginBottom: "var(--spacing-lg)" }}>
          <p style={{ marginBottom: "var(--spacing-xs)" }}><strong>Booking ID:</strong> {searchParams.bookingId}</p>
          <p><strong>Payment Ref:</strong> {searchParams.reference}</p>
        </div>

        <p style={{ marginBottom: "var(--spacing-lg)", fontSize: "1.1rem" }}>
          We have received your payment. A confirmation email with check-in instructions will be sent to you shortly.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link href="/" className="btn btn-primary">Return Home</Link>
          <Link href="/apartment" className="btn btn-outline">Back to Apartment</Link>
        </div>
      </div>
    </main>
  );
}
