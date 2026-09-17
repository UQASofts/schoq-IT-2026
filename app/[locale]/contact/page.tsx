import Form from "@/components/contact/Form";
import GetInTouch from "@/components/contact/GetInTouch";
import Section3 from "@/components/layout/FooterMessage";

import { NextIntlClientProvider } from "next-intl";
import { pick } from "@/lib/pick-messages";
import { getMessages, getTranslations } from "next-intl/server";

import { enableStaticLocale } from "@/i18n/set-locale";
const ContactPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  await enableStaticLocale(params);
  const messages = await getMessages();
  const t = await getTranslations("Contact.Page");

  return (
    <NextIntlClientProvider messages={pick(messages, ["Contact"])}>
      <main className="flex min-h-screen flex-col bg-white pt-[120px] text-foreground">
        <Form />
        <GetInTouch />
        <Section3 description={t("description")} buttonText={t("buttonText")} />
      </main>
    </NextIntlClientProvider>
  );
};

export default ContactPage;
