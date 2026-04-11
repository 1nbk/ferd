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
    label: "Executive Logistics",
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
      }, 4500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering]);

  const active = ITEMS[activeIndex];

  return (
    <section style={{ backgroundColor: "#0f0f0f", padding: "var(--spacing-xl) 0", overflow: "hidden", position: "relative" }}>
      {/* Background decoration */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.03, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: "40%", height: "40%", border: "1px solid var(--color-gold)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "30%", height: "30%", border: "1px solid var(--color-gold)", borderRadius: "50%" }} />
      </div>

      <div className="container">
        <div style={{ marginBottom: "var(--spacing-lg)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <span className="label-caps" style={{ color: "var(--color-gold)", fontSize: "0.8rem", letterSpacing: "0.4em", display: "block", marginBottom: "0.5rem" }}>Gallery of Excellence</span>
            <h2 style={{ color: "var(--color-ivory)", fontSize: "3rem", fontFamily: "var(--font-serif)", fontWeight: 400 }}>Experience Our Industry</h2>
          </div>
          <div style={{ textAlign: "right", paddingBottom: "0.5rem" }}>
             <span style={{ color: "var(--color-gold)", fontSize: "1.5rem", fontFamily: "var(--font-serif)" }}>{String(activeIndex + 1).padStart(2, '0')}</span>
             <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 0.5rem" }}>/</span>
             <span style={{ color: "rgba(255,255,255,0.5)" }}>{ITEMS.length}</span>
          </div>
        </div>

        <div 
          style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "var(--spacing-lg)", minHeight: "650px", position: "relative" }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Main Display */}
          <div style={{ position: "relative", borderRadius: "4px", overflow: "hidden", border: "1px solid rgba(212, 175, 55, 0.2)", backgroundColor: "#151515" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={active.src}
                  alt={active.tagline}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)" }} />
                
                {/* Content Overlay */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "var(--spacing-lg)", color: "var(--color-ivory)" }}>
                   <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3, duration: 0.6 }}
                   >
                     <span className="label-caps" style={{ color: "var(--color-gold)", fontSize: "0.7rem", marginBottom: "0.5rem", display: "block" }}>{active.label}</span>
                     <h3 style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>{active.tagline}</h3>
                     <p style={{ maxWidth: "600px", fontSize: "1.1rem", opacity: 0.8, lineHeight: "1.7", marginBottom: "1.5rem" }}>{active.sub}</p>
                     <Link href={active.cta.href} className="btn-outline" style={{ display: "inline-block", color: "var(--color-ivory)", borderColor: "var(--color-gold)", padding: "10px 25px", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>{active.cta.text}</Link>
                   </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Auto-play indicator */}
            <div style={{ position: "absolute", bottom: 0, left: 0, height: "3px", backgroundColor: "var(--color-gold)", width: isHovering ? "0%" : "100%", transition: isHovering ? "none" : "width 4.5s linear", transformOrigin: "left" }} />
          </div>

          {/* Thumbnail Grid - "Small Small" Floating Gallery */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "1fr", gap: "10px", position: "relative" }}>
             {ITEMS.map((item, idx) => {
               const isActive = idx === activeIndex;
               
               // Complex floating movements
               const float = {
                 y: [0, Math.sin(idx) * 10, 0],
                 x: [0, Math.cos(idx) * 5, 0],
                 rotate: [0, Math.sin(idx) * 2, 0]
               };

               return (
                 <motion.div
                   key={idx}
                   animate={isHovering ? { y: 0, x: 0, rotate: 0 } : float}
                   transition={{ duration: 4 + (idx % 3), repeat: Infinity, ease: "easeInOut" }}
                   style={{ position: "relative", cursor: "pointer", aspectRatio: "1/1" }}
                   onMouseEnter={() => setActiveIndex(idx)}
                 >
                   <div style={{ 
                     position: "absolute", 
                     inset: 0, 
                     borderRadius: "2px", 
                     overflow: "hidden", 
                     border: isActive ? "2px solid var(--color-gold)" : "1px solid rgba(255,255,255,0.1)",
                     transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                     boxShadow: isActive ? "0 0 20px rgba(212,175,55,0.4)" : "none",
                     zIndex: isActive ? 2 : 1,
                     transform: isActive ? "scale(1.1)" : "scale(1)"
                   }}>
                     {/* Loading Shimmer Overlay */}
                     <div style={{ 
                       position: "absolute", 
                       inset: 0, 
                       zIndex: 3, 
                       background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
                       backgroundSize: "200% 100%",
                       animation: "shimmerThumb 2s infinite linear",
                       pointerEvents: "none"
                     }} />
                     
                     <Image 
                       src={item.src} 
                       alt="" 
                       fill 
                       style={{ objectFit: "cover", opacity: isActive ? 1 : 0.6, transition: "opacity 0.3s" }} 
                     />
                     
                     {/* Hover highlight */}
                     {!isActive && (
                       <div style={{ position: "absolute", inset: 0, backgroundColor: "#000", opacity: 0.3, transition: "opacity 0.3s" }} />
                     )}
                   </div>
                 </motion.div>
               );
             })}
             
             {/* Dynamic background particles/glows for the grid */}
             <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "20%", left: "30%", width: "100px", height: "100px", background: "var(--color-gold)", filter: "blur(80px)", opacity: 0.15 }} />
                <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "150px", height: "150px", background: "var(--color-gold)", filter: "blur(100px)", opacity: 0.1 }} />
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmerThumb {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .btn-outline:hover {
          background-color: var(--color-gold) !important;
          color: #000 !important;
        }
      `}</style>
    </section>
  );
}
