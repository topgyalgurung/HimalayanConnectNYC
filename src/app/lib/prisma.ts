// prisma.ts or you can name db.ts

// instantiate a single instance PrismaClient and save it on the globalThis object.
// check globalThis to see if anything is stored on it
// If nothing is on the object, we will create a new PrismaClient; otherwise, we will just reuse the one stored.
// lib/prisma.ts

// docs: best practice for using prisma client in development 

// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;