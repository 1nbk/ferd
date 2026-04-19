export default function Loading() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--color-ivory)",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ 
          width: "48px", 
          height: "48px", 
          border: "3px solid var(--color-champagne)", 
          borderTopColor: "var(--color-gold)", 
          borderRadius: "50%", 
          animation: "spin 1s linear infinite",
          margin: "0 auto 16px"
        }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: "0.85rem", color: "var(--color-obsidian)", opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Loading experience...
        </p>
      </div>
    </div>
  );
}
