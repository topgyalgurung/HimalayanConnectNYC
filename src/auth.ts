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

                    // Check if user already exists
                    const existingUser = await prisma.user.findUnique({
                        where: { email },
                    });

                    if (existingUser) {
                        // Link Google account to existing user if not already linked
                        if (!existingUser.providerId) {
                            await prisma.user.update({
                                where: { email },
                                data: {
                                    providerId: account.providerAccountId,
                                    authProvider: existingUser.authProvider === "credentials"
                                        ? "credentials,google"
                                        : existingUser.authProvider,
                                    image: user.image || existingUser.image,
                                },
                            });
                        }
                    } else {
                        // Create new user from Google profile
                        const nameParts = (user.name || "").split(" ");
                        const firstName = nameParts[0] || "User";
                        const lastName = nameParts.slice(1).join(" ") || "";

                        await prisma.user.create({
                            data: {
                                email,
                                firstName,
                                lastName,
                                image: user.image || null,
                                authProvider: "google",
                                providerId: account.providerAccountId,
                                role: "USER",
                            },
                        });
                    }

                    return true;
                } catch (error) {
                    console.error("Error during Google sign-in:", error);
                    return false;
                }
            }

            return true;
        },

        async jwt({ token, account }: { token: JWT; account?: { provider: string } | null }) {
            if (account) {
                // On initial sign-in, fetch user from DB to get userId and role
                const dbUser = await prisma.user.findUnique({
                    where: { email: token.email! },
                    select: { id: true, role: true, email: true },
                });

                if (dbUser) {
                    token.userId = dbUser.id.toString();
                    token.role = dbUser.role;
                    token.email = dbUser.email;
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
