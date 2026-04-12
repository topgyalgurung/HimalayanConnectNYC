/**
 * NextAuth v5 main configuration
 * Handles Google OAuth sign-in with Prisma-based user management
 * 
 * Flow:
 * 1. User clicks "Sign in with Google"
 * 2. signIn callback: find or create user in DB, link accounts by email
 * 3. jwt callback: attach userId, role, email to JWT
 * 4. session callback: expose userId, role, email on session object
 */

import NextAuth from "next-auth";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import authConfig from "./auth.config";
import { prisma } from "@/app/lib/prisma";

// Extend the session type to include custom properties
declare module "next-auth" {
    interface Session {
        userId?: string;
        role?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userId?: string;
        role?: string;
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    const email = user.email;
                    if (!email) return false;

                    // Keep Google avatar fresh for existing users; create missing users.
                    const nameParts = (user.name || "").trim().split(/\s+/);
                    const firstName = nameParts[0] || "User";
                    const lastName = nameParts.slice(1).join(" ") || "";

                    const existingUser = await prisma.user.findUnique({
                        where: { email },
                        select: { id: true, image: true },
                    });

                    if (existingUser) {
                        if (user.image && user.image !== existingUser.image) {
                            await prisma.user.update({
                                where: { email },
                                data: { image: user.image },
                                select: { id: true },
                            });
                        }
                    } else {
                        // Avoid Prisma create here because the live DB schema can lag
                        // behind the Prisma model in some environments.
                        try {
                            await prisma.$executeRaw`
                                INSERT INTO "User" ("firstName", "lastName", "email", "password", "image", "createdAt", "updatedAt")
                                VALUES (${firstName}, ${lastName}, ${email}, ${null}, ${user.image ?? null}, NOW(), NOW())
                                ON CONFLICT ("email") DO NOTHING
                            `;
                        } catch {
                            // Some older DBs may still enforce password as NOT NULL.
                            await prisma.$executeRaw`
                                INSERT INTO "User" ("firstName", "lastName", "email", "password", "image", "createdAt", "updatedAt")
                                VALUES (${firstName}, ${lastName}, ${email}, ${""}, ${user.image ?? null}, NOW(), NOW())
                                ON CONFLICT ("email") DO NOTHING
                            `;
                        }
                    }

                    return true;
                } catch (error) {
                    console.error("Error during Google sign-in:", error);
                    return false;
                }
            }

            return true;
        },

        async jwt({
            token,
            account,
            user,
        }: {
            token: JWT;
            account?: { provider: string } | null;
            user?: { email?: string | null } | null;
        }) {
            if (account || !token.userId) {
                try {
                    const email = token.email ?? user?.email ?? null;
                    if (!email) return token;

                    // Fetch the app user record to attach role/id to the token.
                    const dbUser = await prisma.user.findUnique({
                        where: { email },
                        select: { id: true, role: true, email: true },
                    });

                    if (dbUser) {
                        token.userId = dbUser.id.toString();
                        token.role = dbUser.role;
                        token.email = dbUser.email;
                    }
                } catch (error) {
                    console.error("Error during JWT callback:", error);
                }
            }

            return token;
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) {
                session.userId = token.userId;
                session.role = token.role;
                if (session.user) {
                    if (token.email) {
                        session.user.email = token.email;
                    }
                    if (token.userId) {
                        session.user.id = token.userId;
                    }
                }
            }
            return session;
        },
    },
});
