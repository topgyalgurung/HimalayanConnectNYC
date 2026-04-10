"use server";

import { Role } from "@prisma/client";
import { auth } from "@/auth";
import {
  getSession as getCustomSession,
  type SessionPayload,
} from "@/app/lib/session";

export type AppSession = SessionPayload & {
  image?: string;
};

export async function getSession(): Promise<AppSession | null> {
  const customSession = await getCustomSession();
  if (customSession) {
    return customSession;
  }

  const nextAuthSession = await auth();
  const nextAuthUser = nextAuthSession?.user as
    | { id?: string; email?: string | null; image?: string | null }
    | undefined;
  const userId = nextAuthSession?.userId ?? nextAuthUser?.id;
  const email = nextAuthSession?.user?.email;

  if (!nextAuthSession || !userId || !email) {
    return null;
  }

  return {
    userId: String(userId),
    email,
    role: nextAuthSession.role ?? Role.USER,
    expiresAt: new Date(nextAuthSession.expires),
    image: nextAuthUser?.image ?? undefined,
  };
}
