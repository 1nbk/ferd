import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Use WebSockets for the Neon adapter (required in Node.js environments)
neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = false;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Clear dev cache manually to ensure our fixes are actually picked up
if (globalForPrisma.prisma) {
  // @ts-ignore
  delete globalForPrisma.prisma;
}

const createPrismaClient = () => {
  // Trim hidden whitespace and surrounding quotes that can corrupt the DSN format
  const rawUrl = process.env.DATABASE_URL || "";
  const connectionString = rawUrl.trim().replace(/^["']|["']$/g, '');
  
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  
  return new PrismaClient({ adapter });
};

export const prisma = createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
