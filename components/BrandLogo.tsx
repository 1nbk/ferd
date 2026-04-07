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
    sm: { width: 80, height: 40 },
    md: { width: 120, height: 60 },
    lg: { width: 180, height: 90 },
  };

  const currentSize = sizeMap[size];

  // If the component is placed on a dark background (variant="light" means we need a "light" colored logo),
  // we might need a different blend mode or filter. But for dark variants (placed on light backgrounds),
  // multiply works perfectly to remove the white background.
  const isLightMode = variant === "light";

  return (
    <Link href="/" style={{ textDecoration: "none", display: "inline-block" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          mixBlendMode: isLightMode ? "screen" : "multiply", 
          filter: isLightMode ? "invert(1)" : "none", // If it's on a dark bg (light variant requested), invert the black/gold and screen the bg
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
