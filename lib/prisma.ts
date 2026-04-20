import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Required for WebSocket support in Node.js (not needed in Edge runtime)
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const connectionString = (process.env.DATABASE_URL ?? "")
    .trim()
    .replace(/^["']|["']$/g, "");

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Check your .env.local file.");
  }

  // @prisma/adapter-neon v7 API: pass config object, not a pre-built Pool
  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({ adapter });
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
