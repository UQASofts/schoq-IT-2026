import { NextIntlClientProvider } from "next-intl";
import { pick } from "@/lib/pick-messages";
import { getMessages, getTranslations } from "next-intl/server";

import HeroSection from "@/components/services/web-development/HeroSection";
import ServicesSectionTwo from "@/components/services/layout/ServicesSectionTwo";
import ServicesSectionThree from "@/components/services/layout/ServicesSectionThree";
import OnePlatform from "@/components/services/web-development/OnePlatform";
import ServicesSectionFive from "@/components/services/layout/ServicesSectionFive";
import Section3 from "@/components/layout/FooterMessage";

interface ConceptToLaunch {
  number: string;
  title: string;
  desc: string;
}
interface FlexibleEngagement {
  title: string;
  desc: string;
}
interface ExpertiseItems {
  id: string;
  firstLine: string;
  secondLine: string;
}

const WebServices = async () => {
  const messages = await getMessages();
  const t = await getTranslations("Web.Page");
  // Section 2
  const conceptToLaunch = t.raw("conceptToLaunch") as ConceptToLaunch[];
  const conceptToLaunchTitle = t("conceptToLaunchTitle");
  const conceptToLaunchDesc = t("conceptToLaunchDesc");

  // Section 3
  const webTitle = t("Three.category");
  const webSubtitle = t("Three.title");
  const flexibleEngagement = t.raw(
    "flexibleEngagement",
  ) as FlexibleEngagement[];
  const expertiseItems = t.raw("expertiseItems") as ExpertiseItems[];
  const expertiseItemsTitle = t("expertiseItemsTitle");
  const expertiseItemsSubTitle = t("expertiseItemsSubTitle");

  return (
    <NextIntlClientProvider messages={pick(messages, ["Web", "Shared"])}>
      <main className="min-h-screen bg-background text-foreground flex flex-col pb-12 pt-10">
        <HeroSection />
        <ServicesSectionTwo
          descriptionData={conceptToLaunch}
          mainTitle={conceptToLaunchTitle}
          mainDesc={conceptToLaunchDesc}
        />
        <ServicesSectionThree
          descriptionData={flexibleEngagement}
          mainTitle={webTitle}
          subTitle={webSubtitle}
        />
        <OnePlatform />
        <ServicesSectionFive
          descriptionData={expertiseItems}
          mainTitle={expertiseItemsTitle}
          subTitle={expertiseItemsSubTitle}
        />
        <Section3
          description={t("footerMessage.description")}
          buttonText={t("footerMessage.buttonText")}
        />
      </main>
    </NextIntlClientProvider>
  );
};

export default WebServices;
