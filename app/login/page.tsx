"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--color-obsidian)",
      backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(139, 111, 71, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201, 168, 122, 0.08) 0%, transparent 50%)",
      padding: "var(--spacing-md)",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "440px",
        backgroundColor: "rgba(30, 26, 22, 0.95)",
        border: "0.5px solid rgba(139, 111, 71, 0.3)",
        padding: "var(--spacing-lg) var(--spacing-md)",
        backdropFilter: "blur(20px)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "var(--spacing-lg)" }}>
          <div style={{
            display: "inline-block",
            mixBlendMode: "screen",
            filter: "invert(1) hue-rotate(180deg) brightness(1.5)",
          }}>
            <Image
              src="/images/logo.png"
              alt="Ferd's"
              width={160}
              height={80}
              style={{ objectFit: "contain", margin: "0 auto" }}
              priority
            />
          </div>
          <div style={{
            width: "40px",
            height: "0.5px",
            backgroundColor: "var(--color-gold)",
            margin: "var(--spacing-sm) auto",
          }} />
          <p style={{
            color: "rgba(201, 168, 122, 0.7)",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            fontFamily: "var(--font-sans)",
          }}>
            Command Center
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
          <div>
            <label style={{
              display: "block",
              color: "rgba(201, 168, 122, 0.7)",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "8px",
              fontFamily: "var(--font-sans)",
            }}>
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(139, 111, 71, 0.4)",
                color: "var(--color-ivory)",
                padding: "14px 16px",
                width: "100%",
                fontSize: "1rem",
                fontFamily: "var(--font-sans)",
                transition: "border-color 0.3s ease",
                outline: "none",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--color-champagne)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(139, 111, 71, 0.4)"}
            />
          </div>

          <div>
            <label style={{
              display: "block",
              color: "rgba(201, 168, 122, 0.7)",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "8px",
              fontFamily: "var(--font-sans)",
            }}>
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(139, 111, 71, 0.4)",
                color: "var(--color-ivory)",
                padding: "14px 16px",
                width: "100%",
                fontSize: "1rem",
                fontFamily: "var(--font-sans)",
                transition: "border-color 0.3s ease",
                outline: "none",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--color-champagne)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(139, 111, 71, 0.4)"}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p style={{
              color: "#e57373",
              fontSize: "0.85rem",
              padding: "10px 14px",
              backgroundColor: "rgba(229, 115, 115, 0.08)",
              border: "0.5px solid rgba(229, 115, 115, 0.3)",
              fontFamily: "var(--font-sans)",
            }}>
              {error}
            </p>
          )}

          <button
            id="login-submit"
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: "var(--spacing-sm)",
              padding: "16px",
              backgroundColor: isLoading ? "rgba(139, 111, 71, 0.5)" : "var(--color-gold)",
              color: "var(--color-obsidian)",
              border: "none",
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontWeight: "500",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              width: "100%",
            }}
          >
            {isLoading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>

        {/* Footer */}
        <p style={{
          textAlign: "center",
          marginTop: "var(--spacing-md)",
          color: "rgba(201, 168, 122, 0.35)",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          fontFamily: "var(--font-sans)",
        }}>
          Ferd&apos;s Luxury · Restricted Access
        </p>
      </div>
    </div>
  );
}
