// JWT utils

// jose library compatible with edge runtime and react's server only package 
// to ensure server management logic executed only on server 

// import "server-only";
"use server"

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Role } from '@prisma/client';

// Ensure JWT_SECRET is set
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
    throw new Error('JWT_SECRET environment variable is not set');
}

const key = new TextEncoder().encode(secretKey);

// make role as role of user 

export type SessionPayload = {
    userId: string; // Stored as string in JWT but converted to number when used with database
    role: Role |string;
    email: string;
    expiresAt: Date;
}

// to store session in a cookie
export async function createSession(userId: string | number, email:string, role:Role) {
    try {
        // Ensure userId is string for JWT token
        const userIdStr = userId.toString();
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        const session = await encrypt({
            userId: userIdStr,
            email,
            role: role.toString(),
            expiresAt
        });
        const cookieStore = await cookies();

        // Set HTTP-only cookie for security
        cookieStore.set("session", session, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            path: '/',
        });

        console.log(`Session created for user ${userIdStr} with role ${role}`);
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
  }
  
// payload should contain min uniquer user data not sensitive
export async function encrypt(payload: SessionPayload) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(session: string | undefined): Promise<SessionPayload | null> {
    if (!session) {
        // Silent return for missing sessions - this is normal for public routes
        return null;
    }

    try {
        const { payload } = await jwtVerify<SessionPayload>(session, key, {
            algorithms: ["HS256"],
        });

        // Validate all required fields
        if (!payload.userId || !payload.email || !payload.role || !payload.expiresAt) {
            console.warn("⚠ Invalid session payload - missing required fields:", {
                hasUserId: !!payload.userId,
                hasRole: !!payload.role,
                hasEmail:!!payload.email,
                hasExpiresAt: !!payload.expiresAt
            });
            return null;
        }

        // Validate role (convert back to Prisma Role type if needed)
    if (!Object.values(Role).includes(payload.role as Role)) {
        console.warn("⚠ Invalid role in session:", payload.role);
        return null;
      }
  

        // Check expiration date
        if (new Date(payload.expiresAt) < new Date()) {
            console.warn("⚠ Session expired for user:", payload.userId);
            return null;
        }

        return {
            ...payload,
            role: payload.role as Role, // convert role back to prisma role type 
        };
    } catch (error) {
        // Only log if there was an actual attempt to use an invalid session
        if (session && session.trim() !== '') {
            console.error("Failed to verify session:", error);
        }
        return null;
    }
}

export async function getSession ():Promise<SessionPayload | null> {
    const session = (await cookies()).get('session')?.value;
    const payload = session ? await decrypt(session) : null;

    if (!payload || !payload.userId || !payload.role) {
        return null;
    }
    return payload;
}

//  Check if your auth library supports refresh tokens, which can be used to extend the user's session.
export async function updateSession() {
    const token = (await cookies()).get('session')?.value
    const payload = await decrypt(token)
    if (!token || !payload) return null;
  
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
    const cookieStore = await cookies()
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: 'lax',
      path: '/',
    })
}
  

export async function deleteSession() {
    try {
        const cookieStore = await cookies();
        // Clear session by setting an expired cookie
        cookieStore.set('session', '', {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
            path: '/',
        });
    } catch (error) {
        console.error('Error deleting session:', error);
        throw error;
    }
}