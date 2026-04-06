import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: ".env.local" });
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Seed Room
  const room = await prisma.room.upsert({
    where: { id: "luxury-penthouse-1" },
    update: {},
    create: {
      id: "luxury-penthouse-1",
      name: "The Platinum Penthouse",
      description: "Experience the pinnacle of luxury in our exquisitely furnished penthouse. Featuring breathtaking views of the Volta hills, high-end amenities, and bespoke interior design.",
      pricePerNight: 2500,
      maxGuests: 4,
      images: [
        "https://res.cloudinary.com/demo/image/upload/v1684333604/interior-living-room.jpg",
        "https://res.cloudinary.com/demo/image/upload/v1684333604/bedroom.jpg"
      ],
      amenities: ["Private Balcony", "High-Speed WiFi", "24/7 Concierge", "Gourmet Kitchen", "Volta Hill View"],
    },
  });

  // Seed Cars
  const cars = [
    {
      id: "car-defender-1",
      name: "Land Rover Defender 110",
      model: "2024 V8 Edition",
      pricePerDay: 1800,
      images: ["https://res.cloudinary.com/demo/image/upload/v1684351332/car-rental.jpg"],
      features: ["All-Wheel Drive", "Panoramic Roof", "Premium Leather Interior", "Off-road Excellence"],
    },
    {
      id: "car-mercedes-1",
      name: "Mercedes-Benz G63 AMG",
      model: "Grand Edition",
      pricePerDay: 3500,
      images: ["https://res.cloudinary.com/demo/image/upload/v1684351332/car-rental.jpg"],
      features: ["V8 Bi-Turbo Engine", "Massive Performance", "Hyper-Luxury Cabin", "Iconic Design"],
    }
  ];

  for (const car of cars) {
    await prisma.car.upsert({
      where: { id: car.id },
      update: {},
      create: car,
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
