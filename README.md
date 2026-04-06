<div align="center">
  <img src="https://skillicons.dev/icons?i=ts,react,nextjs,postgres,prisma,css,git,github,vscode" alt="Tech Stack Icons" />
</div>

<br/>

<h1 align="center">Ferd's — Luxury Apartment & Car Rentals</h1>

<p align="center">
  A premium, full-stack booking platform for an exclusive apartment and car rental business in Ho, Volta Region. <br/>
  Featuring a robust Next.js setup with a database-driven availability engine and a highly responsive <strong>Dark Luxury</strong> aesthetic.
</p>

## ✨ Features

- **Store-front Interface**: Browse luxury apartment details, visual amenity galleries, and premium vehicle models.
- **Availability Booking Engine**: Real-time calendar checking preventing double-booking overlaps for both rooms and vehicles.
- **Integrated Payments**: Frictionless payment integration via Paystack (for local Mobile Money and Card payments).
- **Automated Communication**: Cloud-based email notification system triggered upon successful booking confirmations.
- **Admin Management Dashboard**: Fully protected route to manage dates, monitor upcoming stays, block availability, and process requests.
- **Premium Design System**: Ground-up custom Dark Luxury palette using vanilla CSS variables with Cormorant Garamond and DM Sans typography for peak visual hierarchy.

## 🛠️ Technology Stack

### Full Stack Next.js
- **Core:** TypeScript, React.js, Next.js 14 (App Router)
- **Database:** PostgreSQL synchronized entirely through Prisma ORM
- **Authentication:** NextAuth.js
- **Styling:** Custom Vanilla CSS Modules (Variables & Utility Classes)
- **Payments:** Paystack Inline API
- **Emails & Media:** Resend (Mailing), Cloudinary (Image Hosting) 

## 🚀 Getting Started

To run this platform, you will need Node.js 18+ and a local or remote PostgreSQL server instance.

### Installation & Execution

```bash
# Install dependencies
npm install

# Initialize Prisma Database Client
npx prisma generate
npx prisma db push

# Start the Next.js development server
npm run dev
```

The localized booking portal will launch dynamically at `http://localhost:3000`.

## 🎨 Theme & Design
Ferd's employs a highly intentional **Dark Luxury** design language, centered entirely on high exclusivity and elegance. By rejecting aggressive bright colors for deep Obsidian and strategic Gold accents, the UI immediately instils a perception of premium value to high-end visitors and clients. 

---

<p align="center">Built by <a href="https://github.com/1nbk"> nbk☆ </a></p>
