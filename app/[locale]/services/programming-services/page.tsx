import { getTranslations, getMessages } from "next-intl/server";
import { pick } from "@/lib/pick-messages";
import { NextIntlClientProvider } from "next-intl";

import ProgrammingHeroSection from "@/components/services/programming-services/HeroSection";
import ServicesSectionTwo from "@/components/services/layout/ServicesSectionTwo";
import EngineeringStack from "@/components/services/programming-services/EngineeringStack";
import CleanCode from "@/components/services/programming-services/CleanCode";
import ShipChanges from "@/components/services/programming-services/ShipChanges";
import BuiltTomorrow from "@/components/services/programming-services/BuiltTomorrow";
import ServicesSectionFive from "@/components/services/layout/ServicesSectionFive";
import FooterMessage from "@/components/layout/FooterMessage";

import { enableStaticLocale } from "@/i18n/set-locale";
interface Pipeline {
  number: string;
  title: string;
  desc: string;
}

interface Expertise {
  id: string;
  firstLine: string;
  secondLine: string;
}

export default async function ProgrammingServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await enableStaticLocale(params);
  const messages = await getMessages();
  const t = await getTranslations("ProgrammingServices.Page");

  const pipelineTitle = t("pipeline.mainTitle");
  const pipelineDesc = t("pipeline.desc");
  const pipelineItems = t.raw("pipeline.items") as Pipeline[];

  const expertiseItemsSubTitle = t("experties.subTitle");
  const expertiseItemsTitle = t("experties.mainTitle");
  const expertiseItems = t.raw("experties.items") as Expertise[];

  const footerBtnText = t("footer.buttonText");
  const footerDesc = t("footer.desc");

  return (
    <NextIntlClientProvider
      messages={pick(messages, ["ProgrammingServices", "Shared"])}
    >
      <main className="min-h-screen bg-background text-foreground flex flex-col pt-10">
        <ProgrammingHeroSection />
        <ServicesSectionTwo
          descriptionData={pipelineItems}
          mainTitle={pipelineTitle}
          mainDesc={pipelineDesc}
        />
        <EngineeringStack />
        <CleanCode />
        <ShipChanges />
        <BuiltTomorrow />
        <ServicesSectionFive
          mainTitle={expertiseItemsTitle}
          subTitle={expertiseItemsSubTitle}
          descriptionData={expertiseItems}
        />
        <FooterMessage buttonText={footerBtnText} description={footerDesc} />
      </main>
    </NextIntlClientProvider>
  );
}
