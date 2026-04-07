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

  return (
    <Link href="/" style={{ textDecoration: "none", display: "inline-block" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
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
