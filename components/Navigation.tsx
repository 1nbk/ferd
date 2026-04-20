"use client";

import BrandLogo from "./BrandLogo";

interface NavigationProps {
  theme?: "transparent" | "solid";
  hideLogo?: boolean;
}

export default function Navigation({ theme = "solid", hideLogo = false }: NavigationProps) {
  const isTransparent = theme === "transparent";
  
  const navStyle: React.CSSProperties = {
    padding: "0 var(--spacing-sm)",
    display: "flex",
    alignItems: "center",
    position: isTransparent ? "absolute" : "relative",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "transparent",
    borderBottom: "none",
  };

  return (
    <nav className="container" style={navStyle}>
      {!hideLogo && <BrandLogo variant={isTransparent ? "dark" : "light"} size="sm" />}

    </nav>
  );
}
