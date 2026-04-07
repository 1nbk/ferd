"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { motion, AnimatePresence } from "framer-motion";

interface IdentityVerificationProps {
  onVerificationComplete: (idUrl: string) => void;
  onCancel: () => void;
}

export default function IdentityVerification({ onVerificationComplete, onCancel }: IdentityVerificationProps) {
  const [step, setStep] = useState<"intro" | "upload" | "processing" | "success">("intro");
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);

  const simulateProcessing = (url: string) => {
    setStep("processing");
    // Simulate AI OCR and Liveness Check delay
    setTimeout(() => {
      setDocumentUrl(url);
      setStep("success");
      setTimeout(() => {
        onVerificationComplete(url);
      }, 1500);
    }, 3000);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(10, 10, 10, 0.8)",
      backdropFilter: "blur(4px)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          backgroundColor: "var(--color-ivory)",
          width: "100%",
          maxWidth: "500px",
          borderRadius: "8px",
          padding: "var(--spacing-lg)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid var(--color-champagne)",
          position: "relative"
        }}
      >
        {step !== "processing" && step !== "success" && (
          <button 
            onClick={onCancel}
            style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "var(--color-obsidian)" }}
          >
            &times;
          </button>
        )}

        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ textAlign: "center", marginBottom: "var(--spacing-md)" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto", marginBottom: "16px" }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                  <path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>
                </svg>
                <h2 style={{ fontSize: "2rem", marginBottom: "8px" }}>Identity Verification</h2>
                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                  To maintain the security of our luxury fleet and properties, we require a quick verification of your <strong>Ghana Card</strong> or <strong>Passport</strong>.
                </p>
              </div>

              <div style={{ backgroundColor: "var(--color-linen)", padding: "16px", borderRadius: "4px", marginBottom: "24px", fontSize: "0.9rem", opacity: 0.9 }}>
                <strong style={{ display: "block", marginBottom: "8px", color: "var(--color-obsidian)" }}>What you need:</strong>
                <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li>A valid government-issued ID</li>
                  <li>Good lighting for a clear photo</li>
                </ul>
              </div>

              <button className="btn btn-primary" style={{ width: "100%", padding: "16px", fontSize: "1.1rem" }} onClick={() => setStep("upload")}>
                Begin Verification
              </button>
            </motion.div>
          )}

          {step === "upload" && (
            <motion.div key="upload" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "16px" }}>Upload Document</h2>
              <p style={{ opacity: 0.8, marginBottom: "24px" }}>Please upload a clear image of your Ghana Card or Passport.</p>

              <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ymrwbe75"}
                onSuccess={(result: any) => {
                  if (result.info?.secure_url) {
                    simulateProcessing(result.info.secure_url);
                  }
                }}
              >
                {({ open }) => (
                  <button 
                    type="button"
                    className="btn btn-primary" 
                    style={{ width: "100%", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontSize: "1.1rem", border: "2px dashed var(--color-gold)", background: "transparent", color: "var(--color-obsidian)" }}
                    onClick={() => open()}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    Tap to Capture or Upload ID
                  </button>
                )}
              </CldUploadWidget>

              <p style={{ marginTop: "24px", fontSize: "0.8rem", opacity: 0.5 }}>Your data is securely processed and encrypted.</p>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div key="processing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ display: "inline-block", width: "50px", height: "50px", border: "3px solid var(--color-champagne)", borderTopColor: "var(--color-gold)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              <h3 style={{ marginTop: "24px", fontSize: "1.5rem" }}>Verifying Identity...</h3>
              <p style={{ opacity: 0.7, marginTop: "8px" }}>Checking document authenticity against databases.</p>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "20px 0" }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto", marginBottom: "16px" }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>Identity Verified</h3>
              <p style={{ opacity: 0.8 }}>Thank you! You may now proceed with your booking.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
