"use server";

import { cookies, headers } from "next/headers";
import { Locale, defaultLocale, locales } from "@/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";

function localeFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  const tags = header
    .split(",")
    .map((part) => {
      const [tag, qValue] = part.trim().split(";q=");
      return {
        tag: tag.trim().toLowerCase(),
        q: qValue ? Number.parseFloat(qValue) : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of tags) {
    if (!tag || tag === "*") continue;
    const base = tag.split("-")[0] as Locale;
    if (locales.includes(base)) return base;
  }

  return null;
}

export async function getUserLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get(COOKIE_NAME)?.value;
  if (locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  const acceptLanguage = (await headers()).get("accept-language");
  return localeFromAcceptLanguage(acceptLanguage) ?? defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
