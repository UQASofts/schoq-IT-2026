import { getTranslations, getMessages } from "next-intl/server";
import { pick } from "@/lib/pick-messages";
import { NextIntlClientProvider } from "next-intl";

import CustomSoftwareHeroSection from "@/components/services/custom-software/HeroSection";
import ServicesSectionTwo from "@/components/services/layout/ServicesSectionTwo";
import ServicesSectionThree from "@/components/services/layout/ServicesSectionThree";
import MoreThanInterface from "@/components/services/custom-software/MoreThanInterface";
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

export default async function CustomSoftwareServices() {
  const messages = await getMessages();
  const t = await getTranslations("CustomSoftware.Page");

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
      messages={pick(messages, ["CustomSoftware", "Shared"])}
    >
      <main className="min-h-screen bg-background text-foreground flex flex-col pt-10">
        <CustomSoftwareHeroSection />
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
        <MoreThanInterface />
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
