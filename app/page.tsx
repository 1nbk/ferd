"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa6";
import BrandLogo from "@/components/BrandLogo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const wordFocus: Variants = {
  initial: { opacity: 0, filter: "blur(10px)", y: 10 },
  animate: { 
    opacity: 1, 
    filter: "blur(0px)", 
    y: 0,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
  }
};

const WordReveal = ({ text, style }: { text: string; style?: React.CSSProperties }) => {
  const words = text.split(" ");
  return (
    <motion.h2 
      style={{ ...style, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.4rem" }}
      variants={{
        animate: { transition: { staggerChildren: 0.08 } }
      }}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordFocus}>
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};



export default function Home() {
  const springReveal: Variants = {
    initial: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    animate: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        mass: 0.5, 
        stiffness: 100, 
        damping: 10 
      }
    }
  };

  return (
    <main>
      <Navigation theme="transparent" hideLogo />
      <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: "var(--color-obsidian)" }}>
        {/* Background Image */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
          <Image 
            src="/images/bedroom.jpg" 
            alt="Ferd's Luxury Apartment" 
            fill
            style={{ objectFit: 'cover', opacity: 0.4 }}
            priority
          />
        </div>

        <div className="container" style={{ textAlign: "center", color: "var(--color-ivory)", zIndex: 2, position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(30px)", y: 40 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "var(--spacing-md)", display: "flex", justifyContent: "center" }}
          >
            <BrandLogo variant="dark" size="lg" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", letterSpacing: "0.2em", marginBottom: "var(--spacing-md)", textTransform: "uppercase", opacity: 0.9 }}
          >
            Stay Different. Experience Ho.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <Link href="/apartment" className="btn btn-primary" style={{ backgroundColor: "var(--color-gold)", color: "var(--color-obsidian)" }}>
              View Apartment
            </Link>
            <Link href="/cars" className="btn btn-outline" style={{ borderColor: "var(--color-ivory)", color: "var(--color-ivory)" }}>
              Rent A Car
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container" style={{ padding: "var(--spacing-lg) var(--spacing-sm)", textAlign: "center" }}>
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="label-caps" 
          style={{ display: "block", marginBottom: "var(--spacing-md)" }}
        >
          Welcome to Exclusivity
        </motion.span>
        
        <WordReveal 
          text="A luxury retreat in the heart of the Volta Region" 
          style={{ fontSize: "3.5rem", maxWidth: "900px", margin: "0 auto var(--spacing-md)" }}
        />

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ maxWidth: "600px", margin: "0 auto", fontSize: "1.2rem", opacity: 0.9, lineHeight: "1.8" }}
        >
          Whether you are visiting Ho for business or leisure, Ferd&apos;s offers an unparalleled experience. 
          Discover our premium apartment and effortlessly rent luxury vehicles for your stay.
        </motion.p>
      </section>

      {/* Features Grid */}
      <section style={{ backgroundColor: "var(--color-obsidian)", color: "var(--color-ivory)", padding: "var(--spacing-lg) 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "var(--spacing-lg)" }}>
          
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={springReveal}
            style={{ padding: "var(--spacing-md)" }}
          >
            <div style={{ height: "350px", width: "100%", backgroundColor: "var(--color-linen)", marginBottom: "var(--spacing-md)", position: "relative", overflow: "hidden" }}>
              <Image 
                  src="/images/bedroom.png" 
                  alt="Apartment Bedroom" 
                  fill
                  style={{ objectFit: 'cover' }}
               />
            </div>
            <h3 style={{ color: "var(--color-ivory)", fontSize: "2rem" }}>The Apartment</h3>
            <p style={{ marginBottom: "var(--spacing-sm)", fontSize: "1.1rem", opacity: 0.8 }}>Exquisitely furnished spaces designed for ultimate comfort and relaxation.</p>
            <Link href="/apartment" className="label-caps" style={{ borderBottom: "1px solid var(--color-gold)", paddingBottom: "2px" }}>Discover your stay</Link>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={springReveal}
            style={{ padding: "var(--spacing-md)" }}
          >
             <div style={{ height: "350px", width: "100%", backgroundColor: "var(--color-linen)", marginBottom: "var(--spacing-md)", position: "relative", overflow: "hidden" }}>
              <Image 
                  src="/images/suv.png" 
                  alt="Car Rental" 
                  fill
                  style={{ objectFit: 'cover' }}
               />
            </div>
            <h3 style={{ color: "var(--color-ivory)", fontSize: "2rem" }}>The Fleet</h3>
            <p style={{ marginBottom: "var(--spacing-sm)", fontSize: "1.1rem", opacity: 0.8 }}>Premium vehicles available exclusively for our guests and local clients.</p>
            <Link href="/cars" className="label-caps" style={{ borderBottom: "1px solid var(--color-gold)", paddingBottom: "2px" }}>View vehicles</Link>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}


