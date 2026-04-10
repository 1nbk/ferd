export default function Loading() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "var(--color-linen)", // Consistent luxury background
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 9999,
    }}>
      <div 
        style={{
          width: "50px",
          height: "50px",
          border: "2px solid rgba(212, 175, 55, 0.2)", // Champagne border
          borderTop: "2px solid var(--color-gold)", // Gold spinning part
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}
      />
      <p style={{
        marginTop: "1.5rem",
        color: "var(--color-gold)",
        fontFamily: "var(--font-sans)",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        fontSize: "0.8rem",
        animation: "pulse 2s ease-in-out infinite"
      }}>
        Loading...
      </p>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
