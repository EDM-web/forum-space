import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./sendEmail";
// If your Prisma file is located elsewhere, you can change the path

// const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendEmail({
        //void
        to: user.email,
        resetPasswordLink: url,
        subject: "Forum Space - Reset Password",
      });
    },
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  // account: {
  //   accountLinking: {
  //     enabled: true,
  //     trustedProviders: ["github"],
  //   },
  // },

  plugins: [nextCookies()],
});

// onPasswordReset: async ({ user }, request) => {
//   // your logic here
//   console.log(`Password for user ${user.email} has been reset.`);
// },
