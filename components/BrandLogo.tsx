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
  
  // Sizing mapping based on size prop
  const sizeMap = {
    sm: { width: 250, height: 125, padding: "16px" },
    md: { width: 320, height: 160, padding: "24px" },
    lg: { width: 450, height: 225, padding: "32px" },
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
        padding: currentSize.padding, // Fitts's Law: large clickable area
        margin: `-${currentSize.padding}`, // Offset the padding visually
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
          filter: isDarkTheme ? "invert(1) hue-rotate(180deg) brightness(1.5)" : "contrast(1.1)", // Brighten the gold
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
