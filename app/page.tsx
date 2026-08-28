import Main from "@/components/home/Main";
import Ideas from "@/components/home/Ideas";
import Launch from "@/components/home/Launch";
import OneTeam from "@/components/home/OneTeam";

import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "@/lib/pick-messages";
import IdeasBrought from "@/components/home/IdeasBrought";

export default async function Home() {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, ["Home"])}>
      <Main />
      <Launch />
      <OneTeam />
      <Ideas />
      <IdeasBrought/>
    </NextIntlClientProvider>
  );
}
