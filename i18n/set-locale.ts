import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "./routing";
import type { Locale } from "./config";

export async function enableStaticLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  return locale as Locale;
}
