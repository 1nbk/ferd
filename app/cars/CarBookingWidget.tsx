"use client";

import { useState, useMemo, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format, differenceInDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import IdentityVerification from "@/components/IdentityVerification";
import { loadPaystackScript } from "@/lib/paystack";
import "react-day-picker/dist/style.css";

interface CarBookingWidgetProps {
  pricePerDay: number;
  carId: string;
}

const cssOverrides = `
  .rdp {
    --rdp-cell-size: 38px;
    --rdp-accent-color: var(--color-gold);
    --rdp-background-color: var(--color-linen);
    margin: 0;
    font-family: var(--font-sans);
  }
  .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
    background-color: var(--rdp-accent-color) !important;
    color: var(--color-obsidian) !important;
  }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: var(--color-champagne);
  }
  .booking-input {
    width: 100%;
    padding: 12px 16px;
    background-color: var(--color-linen);
    border: 1px solid var(--color-champagne);
    font-family: var(--font-sans);
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
  }
  .booking-input:focus {
    border-color: var(--color-gold);
    background-color: #fff;
  }
`;

export default function CarBookingWidget({ pricePerDay, carId }: CarBookingWidgetProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [loading, setLoading] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
    idDocumentUrl: "",
    idNumber: "",
    idVerified: false
  });
  const [showVerification, setShowVerification] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(`/api/availability?carId=${carId}`);
        const data = await res.json();
        if (data.unavailableDates) {
          setUnavailableDates(data.unavailableDates.map((d: string) => new Date(d)));
        }
      } catch (err) {
        console.error("Failed to fetch availability", err);
      }
    };
    fetchAvailability();
  }, [carId]);

  const numberOfDays = useMemo(() => {
    if (range?.from && range?.to) {
      return differenceInDays(range.to, range.from) || 1; // Minimum 1 day
    }
    return 0;
  }, [range]);

  const totalPrice = numberOfDays * pricePerDay;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    if (!range?.from || !range?.to || !guestInfo.email) return;
    setLoading(true);
    
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId,
          checkIn: range.from,
          checkOut: range.to,
          totalPrice,
          guest: guestInfo
        })
      });

      const data = await response.json();
      
      if (data.error) {
        alert(data.error);
        setLoading(false);
        return;
      }

      // Step 2: Initialize Paystack Pop-up
      const paystackConfig = {
        email: guestInfo.email,
        amount: totalPrice * 100,
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
        reference: `FERD_${data.bookingId}`,
        access_code: data.access_code,
        onSuccess: (reference: { reference: string }) => {
          window.location.href = `/confirmation/${data.bookingId}?reference=${reference.reference}`;
        },
        onClose: () => {
          setLoading(false);
          alert("Payment canceled.");
        },
      };

      await loadPaystackScript();
      const handler = (window as any).PaystackPop.setup(paystackConfig);
      handler.openIframe();

    } catch (error: any) {
      console.error(error);
      setErrorStatus(error.message || "Failed to initialize payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{ 
        padding: "var(--spacing-md)", 
        backgroundColor: "#fff", 
        border: "1px solid var(--color-champagne)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
      }}
    >
      <style>{cssOverrides}</style>
      
      <div style={{ marginBottom: "var(--spacing-md)", display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
        <span style={{ fontSize: "2.2rem", fontFamily: "var(--font-serif)", color: "var(--color-obsidian)" }}>GHS {pricePerDay}</span>
        <span style={{ opacity: 0.6, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>/ day</span>
      </div>

      {/* Date Selection */}
      <div style={{ marginBottom: "var(--spacing-md)" }}>
        <p className="label-caps" style={{ marginBottom: "var(--spacing-sm)", color: "var(--color-gold)", fontSize: "0.85rem" }}>Select Rental Dates</p>
        <div style={{ padding: "10px", backgroundColor: "var(--color-linen)", width: "fit-content", border: "0.5px solid var(--color-champagne)" }}>
          <DayPicker 
            mode="range" 
            selected={range} 
            onSelect={setRange} 
            disabled={[{ before: new Date() }, ...unavailableDates]} 
          />
        </div>
      </div>

      {/* Guest Info */}
      <div style={{ marginBottom: "var(--spacing-md)", display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <p className="label-caps" style={{ color: "var(--color-gold)", fontSize: "0.85rem" }}>Guest Information</p>
        <input 
          className="booking-input"
          name="name" 
          placeholder="Full Name" 
          value={guestInfo.name} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          className="booking-input"
          name="email" 
          type="email" 
          placeholder="Email Address" 
          value={guestInfo.email} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          className="booking-input"
          name="phone" 
          placeholder="Phone Number" 
          value={guestInfo.phone} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      {/* Price Summary */}
      <AnimatePresence>
        {errorStatus && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              marginBottom: "var(--spacing-md)", 
              padding: "12px", 
              backgroundColor: "rgba(239, 68, 68, 0.05)", 
              border: "0.5px solid #ef4444", 
              color: "#ef4444",
              fontSize: "0.85rem",
              textAlign: "center"
            }}
          >
            {errorStatus}
          </motion.div>
        )}
        {numberOfDays > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ marginBottom: "var(--spacing-md)", padding: "var(--spacing-sm)", backgroundColor: "var(--color-linen)", border: "0.5px solid var(--color-champagne)" }}
          >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.95rem", opacity: 0.8 }}>
                  <span>GHS {pricePerDay} x {numberOfDays} days</span>
                  <span>GHS {totalPrice}</span>
              </div>
              <div style={{ borderTop: "1px solid var(--color-gold)", marginTop: "12px", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontWeight: "600", fontSize: "1.1rem" }}>
                  <span>Total</span>
                  <span>GHS {totalPrice}</span>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        className="btn btn-primary" 
        style={{ width: "100%", padding: "16px", fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase" }} 
        disabled={!range?.from || !range?.to || !guestInfo.email || loading}
        onClick={() => {
          if (!guestInfo.idVerified) {
            setShowVerification(true);
          } else {
            handleBooking();
          }
        }}
      >
        {loading ? "Processing..." : numberOfDays > 0 ? (guestInfo.idVerified ? "Complete Booking" : "Verify ID to Proceed") : "Select Dates"}
      </button>
      
      <p style={{ textAlign: "center", fontSize: "0.75rem", opacity: 0.5, marginTop: "var(--spacing-md)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Secure Checkout Powered by Paystack
      </p>

      {showVerification && (
        <IdentityVerification 
          onVerificationComplete={(url, idNum) => {
            setGuestInfo(prev => ({ ...prev, idDocumentUrl: url, idNumber: idNum, idVerified: true }));
            setShowVerification(false);
          }}
          onCancel={() => setShowVerification(false)}
        />
      )}
    </motion.div>
  );
}
