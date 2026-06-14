import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
// If your Prisma file is located elsewhere, you can change the path

// const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
