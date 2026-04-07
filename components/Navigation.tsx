"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";

interface NavigationProps {
  theme?: "transparent" | "solid";
}

export default function Navigation({ theme = "solid" }: NavigationProps) {
  const pathname = usePathname();
  
  const isTransparent = theme === "transparent";
  
  const navStyle: React.CSSProperties = {
    padding: "var(--spacing-sm) var(--spacing-sm)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: isTransparent ? "absolute" : "relative",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: isTransparent ? "transparent" : "var(--color-linen)", 
    borderBottom: isTransparent ? "none" : "0.5px solid var(--color-champagne)",
  };

  const linkStyle = (path: string): React.CSSProperties => ({
    color: isTransparent ? "var(--color-ivory)" : "var(--color-obsidian)",
    textDecoration: "none",
    borderBottom: pathname === path ? "1px solid var(--color-gold)" : "none",
    paddingBottom: "2px",
  });

  return (
    <nav className="container" style={navStyle}>
      <BrandLogo variant={isTransparent ? "dark" : "light"} size="sm" />
      
      <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
        <Link href="/apartment" className="label-caps" style={linkStyle("/apartment")}>
          Apartment
        </Link>
        <Link href="/cars" className="label-caps" style={linkStyle("/cars")}>
          Cars
        </Link>
      </div>
    </nav>
  );
}
