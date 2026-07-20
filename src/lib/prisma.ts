import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as { prismaInstance?: PrismaClient };

function ensureClient() {
  const existing = globalForPrisma.prismaInstance;
  if (existing) {
    return existing;
  }

  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME || "mettadc",
    connectionLimit: 20,
  });
  
  const c = new PrismaClient({ log: ["error"], adapter });
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prismaInstance = c;
  }
  return c;
}

export const prisma = ensureClient();