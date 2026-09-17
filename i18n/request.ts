import { getRequestConfig } from "next-intl/server";
import deepmerge from "deepmerge";
import { defaultLocale, locales, type Locale } from "./config";

async function loadMessages(locale: string) {
  const files = await Promise.all([
    import(`../messages/${locale}/layout.json`),
    import(`../messages/${locale}/home.json`),
    import(`../messages/${locale}/about.json`),
    import(`../messages/${locale}/contact.json`),
    import(`../messages/${locale}/projects.json`),
    import(`../messages/${locale}/impressum.json`),
    import(`../messages/${locale}/services/ai.json`),
    import(`../messages/${locale}/services/mobile.json`),
    import(`../messages/${locale}/services/shared.json`),
    import(`../messages/${locale}/services/web.json`),
    import(`../messages/${locale}/services/immersive.json`),
    import(`../messages/${locale}/services/cloud.json`),
    import(`../messages/${locale}/services/custom-software.json`),
    import(`../messages/${locale}/services/graphic.json`),
    import(`../messages/${locale}/services/programming.json`),
  ]);

  return files.reduce(
    (acc, mod) => deepmerge(acc, mod.default),
    {} as Record<string, unknown>,
  );
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = locales.includes(requested as Locale)
    ? (requested as Locale)
    : defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
