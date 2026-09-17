import { getTranslations, getMessages } from "next-intl/server";
import { pick } from "@/lib/pick-messages";
import { NextIntlClientProvider } from "next-intl";

import CloudHeroSection from "@/components/services/cloud-infrastructure/HeroSection";
import ServicesSectionTwo from "@/components/services/layout/ServicesSectionTwo";
import ServicesSectionThree from "@/components/services/layout/ServicesSectionThree";
import ServicesSectionFive from "@/components/services/layout/ServicesSectionFive";
import FooterMessage from "@/components/layout/FooterMessage";

interface Pipeline {
  number: string;
  title: string;
  desc: string;
}

interface Capabilities {
  title: string;
  desc: string;
}

interface Expertise {
  id: string;
  firstLine: string;
  secondLine: string;
}

export default async function CloudInfrastructureServices() {
  const messages = await getMessages();
  const t = await getTranslations("CloudInfrastructure.Page");

  const pipelineTitle = t("pipeline.mainTitle");
  const pipelineDesc = t("pipeline.desc");
  const pipelineItems = t.raw("pipeline.items") as Pipeline[];

  const capabilitiesTitle = t("capabilities.mainTitle");
  const capabilitiesSubtitle = t("capabilities.subTitle");
  const capabilitiesItems = t.raw("capabilities.items") as Capabilities[];

  const expertiseItemsSubTitle = t("experties.subTitle");
  const expertiseItemsTitle = t("experties.mainTitle");
  const expertiseItems = t.raw("experties.items") as Expertise[];

  const footerBtnText = t("footer.buttonText");
  const footerDesc = t("footer.desc");

  return (
    <NextIntlClientProvider
      messages={pick(messages, ["CloudInfrastructure", "Shared"])}
    >
      <main className="min-h-screen bg-background text-foreground flex flex-col pt-10">
        <CloudHeroSection />
        <ServicesSectionTwo
          descriptionData={pipelineItems}
          mainTitle={pipelineTitle}
          mainDesc={pipelineDesc}
        />
        <ServicesSectionThree
          descriptionData={capabilitiesItems}
          mainTitle={capabilitiesTitle}
          subTitle={capabilitiesSubtitle}
        />
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
