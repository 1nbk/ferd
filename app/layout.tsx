import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-serif',
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Ferd's Luxury Rentals | Exclusive Stays & Car Fleet in Ghana",
  description: "Experience the pinnacle of hospitality in Ghana. From ultra-modern apartments to an elite fleet of luxury vehicles, Ferd's offers a bespoke experience for the most discerning travelers.",
  keywords: ["Luxury Rentals Ghana", "Accra Luxury Apartments", "Car Rental Ghana", "Bespoke Hospitality", "Ferd's Rentals"],
  openGraph: {
    title: "Ferd's Luxury Rentals",
    description: "Exclusive Stays & Elite Car Fleet in Ghana.",
    url: "https://ferds.com",
    siteName: "Ferd's Luxury Rentals",
    images: [
      {
        url: "https://res.cloudinary.com/dzg8mfqk3/image/upload/v1713180000/og-image.jpg", // Placeholder until real one is generated
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferd's Luxury Rentals",
    description: "Experience the pinnacle of luxury in Ghana.",
    images: ["https://res.cloudinary.com/dzg8mfqk3/image/upload/v1713180000/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
