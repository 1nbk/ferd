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
    label: "The Apartment",
    tagline: "Where rest becomes ritual",
    sub: "A sanctuary of curated luxury in the heart of Ho, Volta Region.",
    cta: { text: "Discover your stay", href: "/apartment" },
  },
  {
    src: "/images/living.png",
    label: "Living Spaces",
    tagline: "Spaces that breathe luxury",
    sub: "Every corner crafted for beauty, comfort, and quiet elegance.",
    cta: { text: "Explore the apartment", href: "/apartment" },
  },
  {
    src: "/images/terrace.png",
    label: "Private Terrace",
    tagline: "Your sky-high sanctuary",
    sub: "Unwind above it all — poolside serenity with panoramic views.",
    cta: { text: "Reserve your suite", href: "/apartment" },
  },
  {
    src: "/images/bedroom.png",
    label: "Bespoke Comfort",
    tagline: "Sleep above the rest",
    sub: "Premium linens, ambient lighting, and absolute privacy.",
    cta: { text: "Book the penthouse", href: "/apartment" },
  },
  {
    src: "/images/suv.png",
    label: "The Fleet",
    tagline: "Built for the journey",
    sub: "Premium SUVs ready to take you anywhere across the Volta Region.",
    cta: { text: "Browse the fleet", href: "/cars" },
  },
  {
    src: "/images/gle.png",
    label: "Executive Class",
    tagline: "Command every road",
    sub: "Arrive in absolute confidence. Leave a lasting impression.",
    cta: { text: "Rent a vehicle", href: "/cars" },
  },
  {
    src: "/images/car_interior.png",
    label: "Refined Interiors",
    tagline: "Luxury from every angle",
    sub: "Hand-stitched leather, ambient lighting — every drive, a pleasure.",
    cta: { text: "View our cars", href: "/cars" },
  },
  {
    src: "/images/car_scenic.png",
    label: "Open Roads",
    tagline: "Explore without limits",
    sub: "Golden-hour drives through Ghana's most breathtaking landscapes.",
    cta: { text: "Plan your drive", href: "/cars" },
  },
];

export default function InteractiveGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-rotate every 3.5s, pause on hover
  useEffect(() => {
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % ITEMS.length);
      }, 3500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering]);

  const active = ITEMS[activeIndex];

  return (
    <section
      style={{
        backgroundColor: "var(--color-obsidian)",
        padding: "var(--spacing-xl) 0",
        overflow: "hidden",
      }}
    >
      {/* Section label */}
      <div
        className="container"
        style={{
          marginBottom: "var(--spacing-md)",
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-md)",
        }}
      >
        <span
          className="label-caps"
          style={{ color: "var(--color-gold)", letterSpacing: "0.3em", fontSize: "0.75rem" }}
        >
          Our World
        </span>
        <div
          style={{ flex: 1, height: "0.5px", backgroundColor: "rgba(212,175,55,0.25)" }}
        />
      </div>

      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 100px",
          gap: "var(--spacing-sm)",
          alignItems: "stretch",
          minHeight: 580,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* ── Main Display ── */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "2px",
          }}
        >
          {/* Crossfade image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${activeIndex}`}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              style={{ position: "absolute", inset: 0 }}
            >
              <Image
                src={active.src}
                alt={active.tagline}
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="(max-width: 768px) 100vw, 75vw"
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.35) 45%, transparent 100%)",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          {!isHovering && (
            <motion.div
              key={`bar-${activeIndex}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3.5, ease: "linear" }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                backgroundColor: "var(--color-gold)",
                transformOrigin: "left",
                zIndex: 10,
              }}
            />
          )}

          {/* Text overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeIndex}`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "var(--spacing-lg) var(--spacing-md)",
                zIndex: 5,
              }}
            >
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  color: "var(--color-gold)",
                  textTransform: "uppercase",
                  marginBottom: "0.6rem",
                }}
              >
                {active.label}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                  color: "var(--color-ivory)",
                  marginBottom: "0.7rem",
                  lineHeight: 1.1,
                  fontWeight: 400,
                }}
              >
                {active.tagline}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.7)",
                  maxWidth: 500,
                  lineHeight: 1.7,
                  marginBottom: "var(--spacing-md)",
                }}
              >
                {active.sub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <Link
                  href={active.cta.href}
                  className="label-caps"
                  style={{
                    color: "var(--color-ivory)",
                    borderBottom: "1px solid var(--color-gold)",
                    paddingBottom: "3px",
                    letterSpacing: "0.15em",
                    fontSize: "0.75rem",
                    transition: "color 0.3s",
                  }}
                >
                  {active.cta.text} →
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide counter */}
          <div
            style={{
              position: "absolute",
              top: "var(--spacing-md)",
              right: "var(--spacing-md)",
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.1em",
            }}
          >
            <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span>/</span>
            <span>{String(ITEMS.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* ── Thumbnail Strip ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {ITEMS.map((item, i) => {
            const isActive = i === activeIndex;
            // Different float offsets for organic feel
            const floatY = i % 3 === 0 ? [-2, 2] : i % 3 === 1 ? [2, -2] : [-3, 1];

            return (
              <motion.button
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                animate={{ y: floatY }}
                transition={{
                  duration: 2.5 + i * 0.3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                style={{
                  position: "relative",
                  width: "100%",
                  flex: 1,
                  minHeight: 0,
                  overflow: "hidden",
                  border: isActive
                    ? "1.5px solid var(--color-gold)"
                    : "1.5px solid rgba(255,255,255,0.08)",
                  outline: "none",
                  cursor: "pointer",
                  borderRadius: "2px",
                  padding: 0,
                  background: "none",
                  transition: "border-color 0.3s ease",
                }}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                  }}
                  sizes="100px"
                />

                {/* Dim overlay */}
                <motion.div
                  animate={{ opacity: isActive ? 0 : 0.55 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.6)",
                  }}
                />

                {/* Gold dot for active */}
                {isActive && (
                  <motion.div
                    layoutId="thumb-dot"
                    style={{
                      position: "absolute",
                      bottom: 4,
                      right: 4,
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      backgroundColor: "var(--color-gold)",
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
