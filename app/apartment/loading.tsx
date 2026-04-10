export default function ApartmentLoading() {
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

      <div className="container" style={{ padding: "var(--spacing-lg) var(--spacing-sm)" }}>
        {/* Header skeleton */}
        <div style={{ textAlign: "center", marginBottom: "var(--spacing-lg)" }}>
          <div style={{ width: 300, height: 48, borderRadius: 2, margin: "0 auto 12px", background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
          <div style={{ width: 180, height: 16, borderRadius: 2, margin: "0 auto", background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
        </div>

        {/* Gallery skeleton */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "var(--spacing-sm)", height: 600, marginBottom: "var(--spacing-xl)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "var(--spacing-sm)" }}>
            <div style={{ background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s 0.1s infinite" }} />
            <div style={{ background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s 0.2s infinite" }} />
          </div>
        </div>

        {/* Content + Booking skeleton */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "var(--spacing-xl)", alignItems: "start" }}>
          {/* Left column */}
          <div>
            <div style={{ paddingBottom: "var(--spacing-lg)", borderBottom: "0.5px solid var(--color-champagne)", marginBottom: "var(--spacing-lg)" }}>
              <div style={{ width: 240, height: 36, borderRadius: 2, marginBottom: 16, background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
              {[100, 95, 88, 75].map((w, i) => (
                <div key={i} style={{ width: `${w}%`, height: 18, borderRadius: 2, marginBottom: 10, background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: `shimmer 1.5s ${i * 0.1}s infinite` }} />
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ width: "70%", height: 18, borderRadius: 2, background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: `shimmer 1.5s ${i * 0.08}s infinite` }} />
              ))}
            </div>
          </div>
          {/* Right column (booking widget placeholder) */}
          <div style={{ border: "1px solid var(--color-champagne)", borderRadius: 2, padding: "var(--spacing-md)", backgroundColor: "#fff" }}>
            <div style={{ width: 140, height: 36, borderRadius: 2, marginBottom: 16, background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
            <div style={{ height: 300, borderRadius: 2, marginBottom: 16, background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
            <div style={{ height: 48, borderRadius: 2, background: "linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
          </div>
        </div>
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
