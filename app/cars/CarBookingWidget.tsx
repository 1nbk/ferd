"use client";

import { useState, useMemo } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format, differenceInDays } from "date-fns";
import "react-day-picker/dist/style.css";

interface CarBookingWidgetProps {
  pricePerDay: number;
  carId: string;
}

const cssOverrides = `
  .rdp {
    --rdp-cell-size: 40px;
    --rdp-accent-color: var(--color-gold);
    --rdp-background-color: var(--color-obsidian);
    margin: 0;
  }
  .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
    background-color: var(--rdp-accent-color);
    color: var(--color-obsidian);
  }
`;

export default function CarBookingWidget({ pricePerDay, carId }: CarBookingWidgetProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [loading, setLoading] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

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
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
        reference: `FERD_${data.bookingId}`,
        onSuccess: (reference: any) => {
          window.location.href = `/apartment/success?reference=${reference.reference}&bookingId=${data.bookingId}`;
        },
        onClose: () => {
          setLoading(false);
          alert("Payment canceled.");
        },
      };

      // @ts-ignore
      const handler = window.PaystackPop.setup(paystackConfig);
      handler.openIframe();

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="thin-border" style={{ padding: "var(--spacing-md)", position: "sticky", top: "2rem", backgroundColor: "var(--color-ivory)" }}>
      <style>{cssOverrides}</style>
      
      <div style={{ marginBottom: "var(--spacing-md)", display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
        <span style={{ fontSize: "2rem", fontFamily: "var(--font-serif)" }}>GHS {pricePerDay}</span>
        <span style={{ opacity: 0.6 }}>/ day</span>
      </div>

      {/* Date Selection */}
      <div style={{ marginBottom: "var(--spacing-md)" }}>
        <p className="label-caps" style={{ marginBottom: "var(--spacing-xs)" }}>Select Rental Dates</p>
        <div className="thin-border" style={{ padding: "var(--spacing-xs)", backgroundColor: "var(--color-linen)", width: "fit-content" }}>
          <DayPicker 
            mode="range" 
            selected={range} 
            onSelect={setRange} 
            disabled={[{ before: new Date() }]} 
          />
        </div>
      </div>

      {/* Guest Info */}
      <div style={{ marginBottom: "var(--spacing-md)", display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <p className="label-caps">Guest Information</p>
        <input 
          name="name" 
          placeholder="Full Name" 
          value={guestInfo.name} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          name="email" 
          type="email" 
          placeholder="Email Address" 
          value={guestInfo.email} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          name="phone" 
          placeholder="Phone Number" 
          value={guestInfo.phone} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      {/* Price Summary */}
      {numberOfDays > 0 && (
        <div style={{ marginBottom: "var(--spacing-md)", padding: "var(--spacing-sm)", backgroundColor: "var(--color-linen)", borderRadius: "2px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>GHS {pricePerDay} x {numberOfDays} days</span>
                <span>GHS {totalPrice}</span>
            </div>
            <div style={{ borderTop: "0.5px solid var(--color-gold)", marginTop: "8px", paddingTop: "8px", display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                <span>Total</span>
                <span>GHS {totalPrice}</span>
            </div>
        </div>
      )}

      <button 
        className="btn btn-primary" 
        style={{ width: "100%", fontSize: "1rem" }} 
        disabled={!range?.from || !range?.to || !guestInfo.email || loading}
        onClick={handleBooking}
      >
        {loading ? "Initializing..." : numberOfDays > 0 ? `Reserve for ${numberOfDays} Days` : "Select Rental Dates"}
      </button>
      
      <p style={{ textAlign: "center", fontSize: "0.8rem", opacity: 0.6, marginTop: "var(--spacing-sm)" }}>
        Secure payment via Paystack.
      </p>
    </div>
  );
}
