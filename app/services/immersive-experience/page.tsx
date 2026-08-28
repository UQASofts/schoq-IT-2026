import { getTranslations, getMessages } from "next-intl/server";
import { pick } from "@/lib/pick-messages";
import { NextIntlClientProvider } from "next-intl";

import ImmersiveHeroSection from "@/components/services/immersive-experience/HeroSection";
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

export default async function ImmersiveServices() {
  const messages = await getMessages();
  const t = await getTranslations("ImmersiveExperience.Page");

  // Section 2
  //   const opportunity = t.raw("opportunity") as Opportunity[];
  const ieMainTitle = t("pipeline.mainTitle");
  const ieDesc = t("pipeline.desc");
  const ieItems = t.raw("pipeline.items") as Pipeline[];
  // Section 3
  //   const practicalAI = t.raw("practicalAI") as PracticalAI[];
  const ieTitle = t("capabilities.mainTitle");
  const ieSubtitle = t("capabilities.subTitle");
  const ieCapabilities = t.raw("capabilities.items") as Capabilities[];

  // Section 5
  const expertiseItemsSubTitle = t("experties.subTitle");
  const expertiseItemsTitle = t("experties.mainTitle");
  const expertiseItems = t.raw("experties.items") as Expertise[];

  // Footer Message
  const footerBtnText = t("footer.buttonText");
  const footerDesc = t("footer.desc");

  return (
    <NextIntlClientProvider messages={pick(messages, ["ImmersiveExperience"])}>
      <main className="min-h-screen bg-background text-foreground flex flex-col pb-12 pt-10">
        <ImmersiveHeroSection />
        <ServicesSectionTwo
          descriptionData={ieItems}
          mainTitle={ieMainTitle}
          mainDesc={ieDesc}
        />
        <ServicesSectionThree
          descriptionData={ieCapabilities}
          mainTitle={ieTitle}
          subTitle={ieSubtitle}
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
