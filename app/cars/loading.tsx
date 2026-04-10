export default function CarsLoading() {
  return (
    <main>
      {/* Nav skeleton */}
      <div style={{
        padding: "var(--spacing-sm)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "0.5px solid var(--color-champagne)",
        backgroundColor: "var(--color-linen)",
      }}>
        <div style={{ width: 80, height: 28, borderRadius: 2, background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
        <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
          <div style={{ width: 80, height: 14, borderRadius: 2, background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
          <div style={{ width: 50, height: 14, borderRadius: 2, background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
        </div>
      </div>

      {/* Page header skeleton */}
      <section className="container" style={{ padding: "var(--spacing-lg) var(--spacing-sm)", textAlign: "center" }}>
        <div style={{ width: 200, height: 48, borderRadius: 2, margin: "0 auto 16px", background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
        <div style={{ width: 420, height: 20, borderRadius: 2, margin: "0 auto", background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
      </section>

      {/* Card grid skeleton */}
      <div className="container" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "var(--spacing-md)",
        padding: "0 var(--spacing-sm) var(--spacing-xl)",
      }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{
            border: "0.5px solid var(--color-champagne)",
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "#fff",
          }}>
            {/* Image placeholder */}
            <div style={{ height: 240, background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: `shimmer 1.5s ${i * 0.15}s infinite` }} />
            {/* Content */}
            <div style={{ padding: "var(--spacing-md)" }}>
              <div style={{ width: "60%", height: 22, borderRadius: 2, marginBottom: 12, background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: `shimmer 1.5s ${i * 0.15}s infinite` }} />
              <div style={{ width: "40%", height: 16, borderRadius: 2, marginBottom: 20, background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: `shimmer 1.5s ${i * 0.15}s infinite` }} />
              <div style={{ width: "100%", height: 44, borderRadius: 2, background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: `shimmer 1.5s ${i * 0.15}s infinite` }} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </main>
  );
}
