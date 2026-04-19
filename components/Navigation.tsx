"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";

interface NavigationProps {
  theme?: "transparent" | "solid";
  hideLogo?: boolean;
}

export default function Navigation({ theme = "solid", hideLogo = false }: NavigationProps) {
  const pathname = usePathname();
  
  const isTransparent = theme === "transparent";
  
  const navStyle: React.CSSProperties = {
    padding: "0 var(--spacing-sm)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: isTransparent ? "absolute" : "relative",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "transparent", 
    borderBottom: "none",
  };

  const linkStyle = (path: string): React.CSSProperties => ({
    color: isTransparent ? "var(--color-ivory)" : "var(--color-obsidian)",
    textDecoration: "none",
    borderBottom: pathname === path ? "1px solid var(--color-gold)" : "none",
    paddingBottom: "2px",
  });

  return (
    <nav className="container" style={navStyle}>
      {!hideLogo && <BrandLogo variant={isTransparent ? "dark" : "light"} size="sm" />}
      <div style={{ display: "flex", gap: "2rem" }}>
        <Link href="/apartment" style={linkStyle("/apartment")}>Apartments</Link>
        <Link href="/cars" style={linkStyle("/cars")}>Fleet</Link>
        <Link href="/book" style={linkStyle("/book")}>Bookings</Link>
      </div>
    </nav>
  );
}
