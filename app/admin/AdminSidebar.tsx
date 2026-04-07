"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Car, Building2, LogOut, ExternalLink } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/fleet", label: "Fleet", icon: Car },
  { href: "/admin/apartment", label: "Apartment", icon: Building2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "260px",
      minHeight: "100vh",
      backgroundColor: "rgba(15, 13, 10, 0.98)",
      borderRight: "0.5px solid rgba(139, 111, 71, 0.2)",
      display: "flex",
      flexDirection: "column",
      padding: "2rem 0",
      position: "sticky",
      top: 0,
      height: "100vh",
    }}>
      {/* Logo */}
      <div style={{ padding: "0 1.5rem 2rem", borderBottom: "0.5px solid rgba(139, 111, 71, 0.15)" }}>
        <div style={{
          mixBlendMode: "screen",
          filter: "invert(1) hue-rotate(180deg) brightness(1.5)",
          marginBottom: "0.5rem",
        }}>
          <Image
            src="/images/logo.png"
            alt="Ferd's"
            width={120}
            height={60}
            style={{ objectFit: "contain" }}
          />
        </div>
        <p style={{
          color: "rgba(201, 168, 122, 0.5)",
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          fontFamily: "var(--font-sans)",
        }}>
          Command Center
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "1.5rem 0" }}>
        <p style={{
          color: "rgba(201, 168, 122, 0.35)",
          fontSize: "0.6rem",
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          padding: "0 1.5rem",
          marginBottom: "0.75rem",
          fontFamily: "var(--font-sans)",
        }}>
          Management
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.875rem 1.5rem",
                color: isActive ? "var(--color-champagne)" : "rgba(201, 168,122, 0.5)",
                backgroundColor: isActive ? "rgba(139, 111, 71, 0.12)" : "transparent",
                borderRight: isActive ? "2px solid var(--color-gold)" : "2px solid transparent",
                fontSize: "0.875rem",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.05em",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div style={{ padding: "1.5rem", borderTop: "0.5px solid rgba(139, 111, 71, 0.15)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 0",
            color: "rgba(201, 168, 122, 0.4)",
            fontSize: "0.8rem",
            fontFamily: "var(--font-sans)",
            transition: "color 0.2s ease",
            textDecoration: "none",
          }}
        >
          <ExternalLink size={14} />
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 0",
            background: "none",
            border: "none",
            color: "rgba(201, 168, 122, 0.4)",
            fontSize: "0.8rem",
            fontFamily: "var(--font-sans)",
            cursor: "pointer",
            transition: "color 0.2s ease",
            textAlign: "left",
          }}
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
