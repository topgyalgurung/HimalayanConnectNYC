// Shared locale constants, safe to import from client and server code.
export const locales = ["en", "ne", "bo"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "locale";

// Native-script names shown in the language switcher.
export const localeNames: Record<Locale, string> = {
  en: "English",
  ne: "नेपाली",
  bo: "བོད་ཡིག",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
