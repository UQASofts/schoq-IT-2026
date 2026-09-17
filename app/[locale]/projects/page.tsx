import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { pick } from "@/lib/pick-messages";
import ProjectsHeroSection from "@/components/projects/HeroSection";
import ProjectsTabs from "@/components/projects/ProjectsTabs";
import ProjectsList from "@/components/projects/ProjectsList";
import FooterMessage from "@/components/layout/FooterMessage";

import { enableStaticLocale } from "@/i18n/set-locale";
export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await enableStaticLocale(params);
  const messages = await getMessages();
  const t = await getTranslations("Projects.Page");

  return (
    <NextIntlClientProvider messages={pick(messages, ["Projects"])}>
      <main className="flex flex-col">
        <ProjectsHeroSection />
        <ProjectsTabs />
        <ProjectsList />
        <FooterMessage description={t("description")} buttonText={t("buttonText")} />
      </main>
    </NextIntlClientProvider>
  );
}
