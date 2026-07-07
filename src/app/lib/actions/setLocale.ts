"use server";

import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/i18n/config";

export async function setLocale(locale: string) {
  const next = isLocale(locale) ? locale : defaultLocale;
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, next, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
