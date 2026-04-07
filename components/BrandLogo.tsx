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
  
  // Sizing mapping based on size prop - heavily increased for Fitts's Law
  const sizeMap = {
    sm: { width: 140, height: 70, padding: "12px" },
    md: { width: 220, height: 110, padding: "20px" },
    lg: { width: 350, height: 175, padding: "32px" },
  };

  const currentSize = sizeMap[size];

  // If the component is placed on a dark background (variant="light" means we need a "light" colored logo),
  // we invert the logo to make the white background black (to be screened out), and the gold text blue.
  // Then we hue-rotate 180deg to make the blue text gold again!
  const isLightMode = variant === "light";

  return (
    <Link 
      href="/" 
      style={{ 
        textDecoration: "none", 
        display: "inline-block",
        padding: currentSize.padding, // Fitts's Law: large clickable area
        margin: `-${currentSize.padding}`, // Offset the padding visually if needed, though usually just an increased hit area is fine
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
          mixBlendMode: isLightMode ? "screen" : "multiply", 
          filter: isLightMode ? "invert(1) hue-rotate(180deg) brightness(1.5)" : "contrast(1.1)", // Brighten the gold on dark backgrounds
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
