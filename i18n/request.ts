import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@/lib/locale";
import deepmerge from "deepmerge";

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
  ]);

  return files.reduce(
    (acc, mod) => deepmerge(acc, mod.default),
    {} as Record<string, unknown>,
  );
}

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: await loadMessages(locale),
  };
});

// --------------------------------------------------------- single json file
// import { getRequestConfig } from "next-intl/server";
// import { getUserLocale } from "@/lib/locale";

// export default getRequestConfig(async () => {
//   const locale = await getUserLocale();

//   return {
//     locale,
//     messages: (await import(`../messages/${locale}.json`)).default,
//   };
// });

// ---------------------------------------------------------
// import { cookies } from "next/headers";
// import { getRequestConfig } from "next-intl/server";

// export default getRequestConfig(async () => {
//   const store = await cookies();
//   const locale = store.get("locale")?.value || "en";

//   return {
//     locale,
//     messages: (await import(`../messages/${locale}.json`)).default,
//   };
// });
