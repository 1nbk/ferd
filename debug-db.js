const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config({ path: '.env.local' });

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log("Checking Room images...");
  const room = await prisma.room.findFirst({
    where: { id: "luxury-penthouse-1" }
  });
  console.log("Room Images:", JSON.stringify(room.images, null, 2));

  console.log("\nChecking Car images...");
  const cars = await prisma.car.findMany();
  cars.forEach(car => {
    console.log(`${car.name}:`, JSON.stringify(car.images, null, 2));
  });

  await prisma.$disconnect();
}

main().catch(console.error);
