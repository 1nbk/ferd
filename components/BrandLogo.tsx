"use client";

import Link from "next/link";

interface BrandLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({ variant = "dark", size = "md" }: BrandLogoProps) {
  const isDark = variant === "dark";
  
  // Responsive sizing mapping
  const sizeMap = {
    sm: { fontSize: "1.1rem", padding: "6px 12px", borderWidth: "0.5px" },
    md: { fontSize: "1.5rem", padding: "10px 24px", borderWidth: "0.8px" },
    lg: { fontSize: "2.5rem", padding: "16px 40px", borderWidth: "1.2px" },
  };

  const currentSize = sizeMap[size];

  return (
    <Link href="/" style={{ textDecoration: "none" }}>
      <div
        style={{
          display: "inline-block",
          border: `${currentSize.borderWidth} solid ${isDark ? "var(--color-gold)" : "var(--color-gold)"}`,
          padding: currentSize.padding,
          fontFamily: "var(--font-serif)",
          fontSize: currentSize.fontSize,
          color: isDark ? "var(--color-ivory)" : "var(--color-obsidian)",
          lineHeight: 1,
          letterSpacing: "0.05em",
          transition: "all 0.3s ease",
          backgroundColor: "transparent", // Truly transparent
        }}
        className="brand-logo-container"
      >
        Ferd&apos;s
      </div>
    </Link>
  );
}
