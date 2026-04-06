import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";

const wordFocus = {
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
  const springReveal = {
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
      {/* Hero Section */}
      <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: "var(--color-obsidian)" }}>
        <div className="container" style={{ textAlign: "center", color: "var(--color-ivory)", zIndex: 2, position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
            style={{ marginBottom: "var(--spacing-md)", display: "flex", justifyContent: "center" }}
          >
            <BrandLogo variant="dark" size="lg" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", letterSpacing: "0.2em", marginBottom: "var(--spacing-md)", textTransform: "uppercase", opacity: 0.8 }}
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
          Whether you are visiting Ho for business or leisure, Ferd's offers an unparalleled experience. 
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

      {/* Footer */}
      <footer className="container" style={{ padding: "var(--spacing-lg) var(--spacing-sm)", textAlign: "center", borderTop: "0.5px solid var(--color-champagne)", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginBottom: "var(--spacing-md)" }}>
          <BrandLogo variant="light" size="md" />
        </div>
        <p className="label-caps">Ho, Volta Region, Ghana</p>
        <div style={{ marginTop: "var(--spacing-md)" }}>
          <p style={{ fontSize: "0.9rem", color: "var(--color-obsidian)", opacity: 0.6 }}>&copy; {new Date().getFullYear()} Ferd's Luxury Rentals. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}


