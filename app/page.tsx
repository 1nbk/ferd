"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(26, 22, 16, 0.4)", zIndex: 1 }} />
          <div style={{ width: "100%", height: "100%", backgroundColor: "var(--color-obsidian)" }}>
             <Image 
                src="/images/living.png" 
                alt="Ferd's Apartment Hero" 
                fill
                style={{ objectFit: 'cover' }}
                priority
             />
          </div>
        </div>
        
        <motion.div 
          className="container" 
          style={{ textAlign: "center", color: "var(--color-ivory)", zIndex: 2, position: "relative" }}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 
            variants={fadeInUp}
            style={{ fontSize: "5rem", color: "var(--color-ivory)", marginBottom: "var(--spacing-sm)" }}
          >
            Ferd's
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", letterSpacing: "0.1em", marginBottom: "var(--spacing-md)", textTransform: "uppercase" }}
          >
            Stay Different. Experience Ho.
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <Link href="/apartment" className="btn btn-primary" style={{ backgroundColor: "var(--color-gold)", color: "var(--color-obsidian)" }}>
              View Apartment
            </Link>
            <Link href="/cars" className="btn btn-outline" style={{ borderColor: "var(--color-ivory)", color: "var(--color-ivory)" }}>
              Rent A Car
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="container" style={{ padding: "var(--spacing-lg) var(--spacing-sm)", textAlign: "center" }}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
        >
          <span className="label-caps" style={{ display: "block", marginBottom: "var(--spacing-md)" }}>Welcome to Exclusivity</span>
          <h2 style={{ fontSize: "3rem", maxWidth: "800px", margin: "0 auto var(--spacing-md)" }}>
            A luxury retreat in the heart of the Volta Region
          </h2>
          <p style={{ maxWidth: "600px", margin: "0 auto", fontSize: "1.1rem" }}>
            Whether you are visiting Ho for business or leisure, Ferd's offers an unparalleled experience. 
            Discover our premium apartment and effortlessly rent luxury vehicles for your stay.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section style={{ backgroundColor: "var(--color-obsidian)", color: "var(--color-ivory)", padding: "var(--spacing-lg) 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--spacing-lg)" }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ padding: "var(--spacing-md)" }}
          >
            <div style={{ height: "300px", width: "100%", backgroundColor: "var(--color-linen)", marginBottom: "var(--spacing-md)", position: "relative" }}>
              <Image 
                  src="/images/bedroom.png" 
                  alt="Apartment Bedroom" 
                  fill
                  style={{ objectFit: 'cover' }}
               />
            </div>
            <h3 style={{ color: "var(--color-ivory)" }}>The Apartment</h3>
            <p style={{ marginBottom: "var(--spacing-sm)" }}>Exquisitely furnished spaces designed for ultimate comfort and relaxation.</p>
            <Link href="/apartment" className="label-caps" style={{ borderBottom: "0.5px solid var(--color-gold)" }}>Discover your stay</Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ padding: "var(--spacing-md)" }}
          >
             <div style={{ height: "300px", width: "100%", backgroundColor: "var(--color-linen)", marginBottom: "var(--spacing-md)", position: "relative" }}>
              <Image 
                  src="/images/suv.png" 
                  alt="Car Rental" 
                  fill
                  style={{ objectFit: 'cover' }}
               />
            </div>
            <h3 style={{ color: "var(--color-ivory)" }}>The Fleet</h3>
            <p style={{ marginBottom: "var(--spacing-sm)" }}>Premium vehicles available exclusively for our guests and local clients.</p>
            <Link href="/cars" className="label-caps" style={{ borderBottom: "0.5px solid var(--color-gold)" }}>View vehicles</Link>
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer className="container" style={{ padding: "var(--spacing-lg) var(--spacing-sm)", textAlign: "center", borderTop: "0.5px solid var(--color-champagne)" }}>
        <h4 style={{ fontSize: "2rem", marginBottom: "var(--spacing-sm)" }}>Ferd's</h4>
        <p className="label-caps">Ho, Volta Region, Ghana</p>
        <div style={{ marginTop: "var(--spacing-md)" }}>
          <p style={{ fontSize: "0.9rem", color: "var(--color-obsidian)", opacity: 0.7 }}>&copy; {new Date().getFullYear()} Ferd's Luxury Rentals. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

