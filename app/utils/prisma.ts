// utils/prisma.ts
import { PrismaClient } from "@prisma/client";

// Initialize Prisma with connection pooling and timeout settings
const prisma = new PrismaClient({
  log: ["warn", "error"], // Enable logs for debugging
  datasources: {
    db: {
      url: process.env.DATABASE_URL + "&connect_timeout=10&pool_timeout=10", // Key changes here
    },
  },
});

// Add automatic retry middleware for queries
prisma.$use(async (params, next) => {
  const MAX_RETRIES = 3;
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      return await next(params);
    } catch (error) {
      if (retryCount === MAX_RETRIES - 1) throw error; // Final attempt
      
      console.warn(`Prisma query failed (attempt ${retryCount + 1}):`, params.action, params.model);
      await new Promise((resolve) => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
      retryCount++;
    }
  }
});

// Optional: Keep connections alive during development
if (process.env.NODE_ENV === "development") {
  setInterval(async () => {
    await prisma.$queryRaw`SELECT 1`.catch(() => {});
  }, 300_000); // Ping every 5 minutes
}

export default prisma;