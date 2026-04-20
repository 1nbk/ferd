import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = false;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const connectionString = (process.env.DATABASE_URL ?? "")
    .trim()
    .replace(/^["']|["']$/g, "")
    // Remove unsupported channel_binding param that breaks some drivers
    .replace(/[&?]channel_binding=require/gi, "");

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Check your .env.local file."
    );
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool as any);
  return new PrismaClient({ adapter });
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
