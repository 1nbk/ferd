/**
 * Dynamically loads the Paystack inline.js script on demand.
 * Returns a promise that resolves when PaystackPop is available.
 */
let paystackLoading: Promise<void> | null = null;

export function loadPaystackScript(): Promise<void> {
  // If already loaded
  if (typeof window !== "undefined" && (window as any).PaystackPop) {
    return Promise.resolve();
  }

  // If already loading, return existing promise
  if (paystackLoading) return paystackLoading;

  paystackLoading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Paystack script"));
    
    // Paystack checks for a parent form — wrap in a hidden form to satisfy it
    const form = document.createElement("form");
    form.style.display = "none";
    form.appendChild(script);
    document.body.appendChild(form);
  });

  return paystackLoading;
}
