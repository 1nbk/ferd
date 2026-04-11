"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  src: string;
  label: string;
  tagline: string;
  sub: string;
  cta: { text: string; href: string };
}

const ITEMS: GalleryItem[] = [
  {
    src: "/images/bedroom.jpg",
    label: "Hospitality Reimagined",
    tagline: "The Art of the Stay",
    sub: "In the luxury hospitality industry, the details aren't just details—they are the experience. We define comfort through curated elegance.",
    cta: { text: "Our Apartment", href: "/apartment" },
  },
  {
    src: "/images/living.png",
    label: "Architectural Excellence",
    tagline: "Designed for Living",
    sub: "Modern African luxury blends minimalism with warmth. Our spaces are designed to breathe, inspired by international boutique standards.",
    cta: { text: "Explore Spaces", href: "/apartment" },
  },
  {
    src: "/images/terrace.png",
    label: "Urban Sanctuaries",
    tagline: "Above the Horizon",
    sub: "Luxury is the ability to withdraw into peace. Our terrace designs focus on privacy, light, and the breathtaking vistas of the Volta Region.",
    cta: { text: "Experience Peace", href: "/apartment" },
  },
  {
    src: "/images/apartment_kitchen.png",
    label: "Gourmet Standards",
    tagline: "Culinary Sophistication",
    sub: "A home away from home requires a kitchen that inspires. We provide professional-grade culinary environments for our guests.",
    cta: { text: "View Amenities", href: "/apartment" },
  },
  {
    src: "/images/bedroom.png",
    label: "Serenity Defined",
    tagline: "A Canvas for Rest",
    sub: "Studies show that ambient environment is key to recovery. Our bedroom aesthetics are optimized for profound relaxation.",
    cta: { text: "Book Now", href: "/apartment" },
  },
  {
    src: "/images/suv.png",
    label: "Premium Mobility",
    tagline: "The Pulse of the Road",
    sub: "In the premium automotive sector, reliability meets prestige. Our fleet is maintained to 5-star safety and aesthetic standards.",
    cta: { text: "The Fleet", href: "/cars" },
  },
  {
    src: "/images/gle.png",
    label: "Executive Class",
    tagline: "Commanding Presence",
    sub: "For the discerning traveler, transportation is a statement of intent. We facilitate prestige movement with absolute discretion.",
    cta: { text: "Rent Executive", href: "/cars" },
  },
  {
    src: "/images/car_dashboard.png",
    label: "Technological Purity",
    tagline: "Innovation in Motion",
    sub: "Modern cars are high-tech hubs. We select vehicles that offer the latest in digital integration and driver assistance.",
    cta: { text: "View Details", href: "/cars" },
  },
  {
    src: "/images/car_interior.png",
    label: "Craftsmanship",
    tagline: "Tactile Luxury",
    sub: "Leather, wood, and metal. The interior industry focuses on the touch-points that connect the driver to the machine.",
    cta: { text: "Luxury Cars", href: "/cars" },
  },
  {
    src: "/images/car_scenic.png",
    label: "Exploration",
    tagline: "Freedom Without Limits",
    sub: "The travel industry is built on the desire for discovery. We provide the tools to explore Ghana's hidden gems in total luxury.",
    cta: { text: "Start Journey", href: "/cars" },
  },
];

export default function InteractiveGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % ITEMS.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering]);

  const active = ITEMS[activeIndex];

  return (
    <section 
      style={{ 
        backgroundColor: "#000", 
        height: "90vh", 
        maxHeight: "900px",
        position: "relative", 
        overflow: "hidden" 
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ── BACKGROUND LAYER ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        >
          <Image
            src={active.src}
            alt={active.tagline}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          {/* Complex cinematic gradient/overlay */}
          <div style={{ 
            position: "absolute", 
            inset: 0, 
            background: "radial-gradient(circle at 30% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%)",
            zIndex: 2
          }} />
        </motion.div>
      </AnimatePresence>

      {/* ── CONTENT OVERLAY (Z-Index 3) ── */}
      <div className="container" style={{ position: "relative", height: "100%", zIndex: 10, display: "flex", alignItems: "center" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${activeIndex}`}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            style={{ maxWidth: "650px", color: "var(--color-ivory)" }}
          >
            <span className="label-caps" style={{ 
              color: "var(--color-gold)", 
              fontSize: "0.8rem", 
              letterSpacing: "0.5em", 
              display: "block", 
              marginBottom: "1rem" 
            }}>
              {active.label}
            </span>
            <h2 style={{ 
              fontSize: "clamp(3rem, 6vw, 4.5rem)", 
              fontFamily: "var(--font-serif)", 
              lineHeight: 1, 
              marginBottom: "1.5rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)" 
            }}>
              {active.tagline}
            </h2>
            <p style={{ 
              fontSize: "1.2rem", 
              opacity: 0.85, 
              lineHeight: "1.8", 
              marginBottom: "2rem",
              maxWidth: "500px" 
            }}>
              {active.sub}
            </p>
            <Link 
              href={active.cta.href} 
              className="btn btn-primary" 
              style={{ 
                backgroundColor: "var(--color-gold)", 
                color: "#000", 
                padding: "18px 40px",
                display: "inline-block" 
              }}
            >
              {active.cta.text}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── THUMBNAIL CLOUD OVERLAY (Z-Index 4) ── */}
      <div 
        style={{ 
          position: "absolute", 
          right: "5%", 
          top: "50%", 
          transform: "translateY(-50%)",
          zIndex: 20,
          display: "grid",
          gridTemplateColumns: "repeat(2, 80px)",
          gap: "12px",
          pointerEvents: "auto"
        }}
      >
        {ITEMS.map((item, idx) => {
          const isActive = idx === activeIndex;
          
          return (
            <motion.button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              whileHover={{ scale: 1.15, zIndex: 30 }}
              animate={{ 
                y: [0, (idx % 2 === 0 ? -8 : 8), 0],
                opacity: isActive ? 1 : 0.65,
                border: isActive ? "2px solid var(--color-gold)" : "1px solid rgba(255,255,255,0.2)"
              }}
              transition={{ 
                y: { duration: 4 + (idx % 4), repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 },
                opacity: { duration: 0.3 }
              }}
              style={{ 
                position: "relative",
                width: "80px",
                height: "80px",
                borderRadius: "2px",
                overflow: "hidden",
                cursor: "pointer",
                background: "#000",
                padding: 0,
                outline: "none",
                boxShadow: isActive ? "0 0 20px rgba(212,175,55,0.5)" : "none"
              }}
            >
              {/* Shimmer effect for "Loading" feel */}
              <div style={{ 
                position: "absolute", 
                inset: 0, 
                zIndex: 2, 
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmerThumb 3s infinite linear",
                pointerEvents: "none"
              }} />
              
              <Image 
                src={item.src} 
                alt="" 
                fill 
                style={{ 
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  transform: isActive ? "scale(1.1)" : "scale(1)"
                }} 
              />
            </motion.button>
          );
        })}
      </div>

      {/* Auto-play progress ring (bottom right) */}
      {!isHovering && (
        <div style={{ position: "absolute", bottom: "40px", right: "40px", zIndex: 30 }}>
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <motion.circle 
                cx="20" cy="20" r="18" 
                fill="none" 
                stroke="var(--color-gold)" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              />
            </svg>
        </div>
      )}

      <style>{`
        @keyframes shimmerThumb {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}
