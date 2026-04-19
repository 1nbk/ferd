import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Use WebSockets for the Neon adapter (required in Node.js environments)
neonConfig.webSocketConstructor = ws;
// Enable connection caching to reduce per-request latency
neonConfig.poolQueryViaFetch = true;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  const connectionString = (process.env.DATABASE_URL || "")
    .replace(/&channel_binding=require/, "")
    .replace(/\?channel_binding=require&/, "?")
    .replace(/\?channel_binding=require$/, "");

  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
