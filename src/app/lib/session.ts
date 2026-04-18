// Server-only session management (cookie operations).
// JWT encrypt/decrypt live in session-edge.ts for Edge Runtime compatibility.

import { cookies } from "next/headers";
import {
  encrypt,
  decrypt,
} from "@/app/lib/session-edge";
import type { SessionPayload } from "@/app/lib/session-edge";

export type { SessionPayload } from "@/app/lib/session-edge";
export { encrypt, decrypt };

const SESSION_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000;
const isProduction = process.env.NODE_ENV === "production";

export async function createSession(
  userId: string | number,
  email: string,
  role: string
) {
  try {
    const userIdStr = userId.toString();
    const expiresAt = new Date(Date.now() + SESSION_EXPIRATION_MS);

    const session = await encrypt({
      userId: userIdStr,
      email,
      role: role.toString(),
      expiresAt,
    });

    const cookieStore = await cookies();

    cookieStore.set("session", session, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      expires: expiresAt,
      maxAge: Math.floor(SESSION_EXPIRATION_MS / 1000),
      path: "/",
    });
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) {
      // This is normal for unauthenticated users, no need to log as error
      return null;
    }
    const payload = await decrypt(session);
    if (!payload) {
      // Session exists but is invalid/expired, this is also normal
      return null;
    }
    return payload;
  } catch (error: Error | unknown) {
    // Only log actual errors, not expected scenarios
    console.error("Error in getSession:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return null;
  }
}

//  Check if your auth library supports refresh tokens, which can be used to extend the user's session.
export async function updateSession() {
  const token = (await cookies()).get("session")?.value; // getting same payload
  const payload = await decrypt(token);
  if (!token || !payload) return null;

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    expires: payload.expiresAt,
    maxAge: Math.max(
      0,
      Math.floor((new Date(payload.expiresAt).getTime() - Date.now()) / 1000)
    ),
    path: "/",
  });
}

export async function deleteSession() {
  try {
    const cookieStore = await cookies();
    // Clear session by setting an expired cookie
    cookieStore.set("session", "", {
      httpOnly: true,
      secure: isProduction,
      expires: new Date(0),
      path: "/",
    });
  } catch (error) {
    console.error("Error deleting session:", error);
    throw error;
  }
}
