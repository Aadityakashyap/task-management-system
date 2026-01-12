import { PrismaClient } from "@/data/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter =
  process.env.NODE_ENV === "production"
    ? new PrismaPg({
        connectionString: process.env.DATABASE_URL,
      })
    : new PrismaBetterSqlite3({
        url: process.env.DATABASE_URL,
      });

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
