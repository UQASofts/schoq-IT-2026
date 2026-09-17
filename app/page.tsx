import Main from "@/components/home/Main";
import Ideas from "@/components/home/Ideas";
import Launch from "@/components/home/Launch";
import OneTeam from "@/components/home/OneTeam";

import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "@/lib/pick-messages";
import IdeasBrought from "@/components/home/IdeasBrought";
import FooterMessage from "@/components/layout/FooterMessage";

export default async function Home() {
  const messages = await getMessages();
  const t = await getTranslations("Home.Page");

  return (
    <NextIntlClientProvider messages={pick(messages, ["Home"])}>
      <Main />
      <Launch />
      <OneTeam />
      {/* <Ideas /> */}
      <IdeasBrought/>
      <FooterMessage description={t("description")} buttonText={t("buttonText")} />
    </NextIntlClientProvider>
  );
}
