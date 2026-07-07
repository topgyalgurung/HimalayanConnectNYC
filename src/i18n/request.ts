// next-intl configuration ("without i18n routing" mode).
// The locale comes from a cookie set by the language switcher, so URLs stay
// unchanged and the existing auth middleware is untouched.
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const candidate = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(candidate) ? candidate : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
