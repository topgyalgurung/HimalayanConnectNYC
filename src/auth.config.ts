/**
 * NextAuth Edge-compatible configuration
 * This file is imported by middleware.ts (Edge Runtime)
 * Keep this free of Node.js-only dependencies (no Prisma, no bcrypt)
 */

import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
