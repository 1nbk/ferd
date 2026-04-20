import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Use WebSockets for the Neon adapter (required in Node.js environments)
neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = false;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  // Trim hidden whitespace and surrounding quotes that can corrupt the DSN format
  const rawUrl = process.env.DATABASE_URL || "";
  const connectionString = rawUrl.trim().replace(/^["']|["']$/g, '');
  
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool as any);
  
  return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
