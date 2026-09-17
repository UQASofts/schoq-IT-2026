import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { pick } from "@/lib/pick-messages";
import ImpressumHeroSection from "@/components/impressum/HeroSection";
import LegalInformation from "@/components/impressum/legalInformation";
import FooterMessage from "@/components/layout/FooterMessage";

import { enableStaticLocale } from "@/i18n/set-locale";
export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await enableStaticLocale(params);
  const messages = await getMessages();
  const t = await getTranslations("Impressum.Page");

  return (
    <NextIntlClientProvider messages={pick(messages, ["Impressum"])}>
      <main className="flex flex-col">
        <ImpressumHeroSection />
        <LegalInformation />
        <FooterMessage
          description={t("description")}
          buttonText={t("buttonText")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
