"use server";

import { cookies } from "next/headers";
import { Locale, defaultLocale, locales } from "@/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get(COOKIE_NAME)?.value;
  return locales.includes(cookieLocale as Locale)
    ? (cookieLocale as Locale)
    : defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}

// import { cookies } from "next/headers";

// export async function getUserLocale() {
//   const cookieStore = await cookies();

//   return cookieStore.get("locale")?.value ?? "en";
// }
