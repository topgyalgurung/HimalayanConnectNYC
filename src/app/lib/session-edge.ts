/**
 * Edge-safe JWT utilities for use in middleware and Edge Runtime.
 * No "use server" directive, no @prisma/client, no cookies() — just jose.
 */

import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error("JWT_SECRET environment variable is not set");
}
const key = new TextEncoder().encode(secretKey);

const VALID_ROLES = ["USER", "ADMIN"] as const;

export type SessionPayload = {
  userId: string;
  role: string;
  email: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(
  session: string | undefined
): Promise<SessionPayload | null> {
  if (!session || session.trim() === "") {
    return null;
  }

  try {
    const { payload } = await jwtVerify<SessionPayload>(session, key, {
      algorithms: ["HS256"],
    });
    if (!payload) return null;

    if (
      !payload.userId ||
      !payload.email ||
      !payload.role ||
      !payload.expiresAt
    ) {
      return null;
    }

    if (
      !VALID_ROLES.includes(payload.role as (typeof VALID_ROLES)[number])
    ) {
      return null;
    }

    if (new Date(payload.expiresAt) < new Date()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
