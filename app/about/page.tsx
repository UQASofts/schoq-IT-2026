import Section1 from "@/components/about/Section1";
import Section2 from "@/components/about/Section2";
import Section3 from "@/components/layout/FooterMessage";

import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "@/lib/pick-messages";

export default async function AboutPage() {
  const messages = await getMessages();
  const t = await getTranslations("About.Page");

  return (
    <NextIntlClientProvider messages={pick(messages, ["About"])}>
      <main className="min-h-screen bg-background text-foreground flex flex-col pb-12 pt-20">
        <Section1 />
        <Section2 />
        <Section3
          description={t("description")}
          buttonText={t("buttonText")}
          // description="Have a challenge worth solving?"
          // buttonText="Start a Project"
        />
      </main>
    </NextIntlClientProvider>
  );
}
