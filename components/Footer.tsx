"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa6";
import BrandLogo from "./BrandLogo";

const FooterAnimatedLogo = () => {
  const letters = "Ferd's".split("");
  
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { borderColor: "rgba(139, 111, 71, 0)" },
        visible: { 
          borderColor: "rgba(139, 111, 71, 1)", 
          transition: { duration: 1.5, staggerChildren: 0.2, delayChildren: 0.3 } 
        }
      }}
      style={{
        display: "inline-flex",
        border: "1px solid",
        padding: "8px 24px",
        fontFamily: "var(--font-serif)",
        fontSize: "1.6rem",
        color: "var(--color-gold)",
        letterSpacing: "0.05em"
      }}
    >
      {letters.map((char, i) => (
        <motion.span 
          key={i} 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 12 } }
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-linen)", paddingTop: "var(--spacing-sm)", paddingBottom: "var(--spacing-sm)", borderTop: "1px solid var(--color-champagne)", marginTop: "auto" }}>
      <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: "var(--spacing-md)", marginBottom: "var(--spacing-sm)" }}>
        
        {/* Contact Details */}
        <div>
          <h4 className="label-caps" style={{ marginBottom: "var(--spacing-sm)" }}>Contact Us</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", opacity: 0.8, fontSize: "0.95rem" }}>
              <MapPin size={16} color="var(--color-gold)" />
              <span>Ho, Volta Region, Ghana</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", opacity: 0.8, fontSize: "0.95rem" }}>
              <Phone size={16} color="var(--color-gold)" />
              <span>+233 (0) 24 123 4567</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", opacity: 0.8, fontSize: "0.95rem" }}>
              <Mail size={16} color="var(--color-gold)" />
              <span>reservations@ferdsluxury.com</span>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div>
          <h4 className="label-caps" style={{ marginBottom: "var(--spacing-sm)" }}>Connect</h4>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href="#" style={{ color: "var(--color-obsidian)", opacity: 0.8, transition: "color 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
              <FaInstagram />
            </a>
            <a href="#" style={{ color: "var(--color-obsidian)", opacity: 0.8, transition: "color 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
              <FaFacebook />
            </a>
            <a href="#" style={{ color: "var(--color-obsidian)", opacity: 0.8, transition: "color 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Centered Logo & Text */}
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "var(--spacing-sm)" }}>
        <FooterAnimatedLogo />
        <p style={{ opacity: 0.8, lineHeight: "1.6", maxWidth: "450px", textAlign: "center", marginTop: "var(--spacing-sm)", fontSize: "0.9rem" }}>
          Exclusivity and comfort fused. Experience the ultimate luxury stay and premium rides in the heart of Volta Region.
        </p>
      </div>

      {/* Copyright */}
      <div className="container" style={{ textAlign: "center", borderTop: "0.5px solid var(--color-champagne)", paddingTop: "var(--spacing-sm)" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--color-obsidian)", opacity: 0.6 }}>&copy; {new Date().getFullYear()} Ferd&apos;s Luxury Rentals. All rights reserved.</p>
      </div>
    </footer>
  );
}
