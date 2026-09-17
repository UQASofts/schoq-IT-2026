import { getTranslations, getMessages } from "next-intl/server";
import { pick } from "@/lib/pick-messages";
import { NextIntlClientProvider } from "next-intl";

import GraphicDesignHeroSection from "@/components/services/graphic-design/HeroSection";
import ServicesSectionTwo from "@/components/services/layout/ServicesSectionTwo";
import WhatWeDesign from "@/components/services/graphic-design/WhatWeDesign";
import ComplexToClear from "@/components/services/graphic-design/ComplexToClear";
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

export default async function GraphicDesignServices({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await enableStaticLocale(params);
  const messages = await getMessages();
  const t = await getTranslations("GraphicDesign.Page");

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
      messages={pick(messages, ["GraphicDesign", "Shared"])}
    >
      <main className="min-h-screen bg-background text-foreground flex flex-col pt-10">
        <GraphicDesignHeroSection />
        <ServicesSectionTwo
          descriptionData={pipelineItems}
          mainTitle={pipelineTitle}
          mainDesc={pipelineDesc}
        />
        <WhatWeDesign />
        <ComplexToClear />
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
