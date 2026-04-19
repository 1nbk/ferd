import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  // Remove channel_binding param which is incompatible with the Neon serverless HTTP driver
  const connectionString = (process.env.DATABASE_URL || "")
    .replace(/&channel_binding=require/, "")
    .replace(/\?channel_binding=require&/, "?")
    .replace(/\?channel_binding=require$/, "");

  const sql = neon(connectionString);
  const adapter = new PrismaNeon(sql);
  return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
