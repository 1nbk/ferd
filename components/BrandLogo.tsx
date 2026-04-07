"use client";

import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({ variant = "dark", size = "md" }: BrandLogoProps) {
  // Using the requested logo.png
  const logoSrc = "/images/logo.png";
  
  // Sizing mapping based on size prop - refined for better balance
  const sizeMap = {
    sm: { width: 150, height: 75, padding: "8px" },
    md: { width: 240, height: 120, padding: "12px" },
    lg: { width: 380, height: 190, padding: "24px" },
  };

  const currentSize = sizeMap[size];

  // "variant" indicates the theme of the CONTAINER it rests on.
  // "dark" variant -> Container is dark -> We need an inverted logo
  // "light" variant -> Container is light -> We need a normal multiplied logo
  const isDarkTheme = variant === "dark";

  return (
    <Link 
      href="/" 
      style={{ 
        textDecoration: "none", 
        display: "inline-block",
        padding: currentSize.padding, // Fitts's Law: moderate clickable area without breaking layout
        borderRadius: "8px",
      }}
      className="brand-logo-link"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          mixBlendMode: isDarkTheme ? "screen" : "multiply", 
          filter: isDarkTheme ? "invert(1) hue-rotate(180deg) brightness(1.5)" : "contrast(1.1)", 
        }}
        className="brand-logo-container"
      >
        <Image 
          src={logoSrc} 
          alt="Ferd's Logo" 
          width={currentSize.width} 
          height={currentSize.height}
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </Link>
  );
}
