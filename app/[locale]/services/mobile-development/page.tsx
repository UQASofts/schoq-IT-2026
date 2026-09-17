import { NextIntlClientProvider } from "next-intl";
import { pick } from "@/lib/pick-messages";
import { getMessages, getTranslations } from "next-intl/server";

import ServicesHero from "@/components/services/mobile-development/ServicesHero";
import ProductDemonstration from "@/components/services/mobile-development/ProductDemonstration";
import ServicesSectionFive from "@/components/services/layout/ServicesSectionFive";
import ServicesSectionThree from "@/components/services/layout/ServicesSectionThree";
import ServicesSectionTwo from "@/components/services/layout/ServicesSectionTwo";
import FooterMessage from "@/components/layout/FooterMessage";

import { enableStaticLocale } from "@/i18n/set-locale";
interface ProductBlueprint {
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

const MobileServices = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  await enableStaticLocale(params);
  const messages = await getMessages();
  const t = await getTranslations("Mobile.Page");
  // Section 2
  const productBlueprint = t.raw("productBlueprint") as ProductBlueprint[];
  const productBlueprintTitle = t("productBlueprintTitle");
  const productBlueprintTitleDesc = t("productBlueprintTitleDesc");
  // Section 3
  const mobTitle = t("Three.category");
  const mobSubtitle = t("Three.title");
  const flexibleEngagement = t.raw(
    "flexibleEngagement",
  ) as FlexibleEngagement[];
  // Section 5
  const expertiseItems = t.raw("expertiseItems") as ExpertiseItems[];
  const expertiseItemsTitle = t("expertiseItemsTitle");
  const expertiseItemsSubTitle = t("expertiseItemsSubTitle");

  return (
    <NextIntlClientProvider messages={pick(messages, ["Mobile", "Shared"])}>
      <main className="min-h-screen bg-background text-foreground flex flex-col pt-10">
        <ServicesHero />
        <ServicesSectionTwo
          descriptionData={productBlueprint}
          mainTitle={productBlueprintTitle}
          mainDesc={productBlueprintTitleDesc}
        />
        <ServicesSectionThree
          descriptionData={flexibleEngagement}
          mainTitle={mobSubtitle}
          subTitle={mobTitle}
        />
        <ProductDemonstration />
        <ServicesSectionFive
          descriptionData={expertiseItems}
          mainTitle={expertiseItemsTitle}
          subTitle={expertiseItemsSubTitle}
        />
        <FooterMessage
          description={t("footerMessage.description")}
          buttonText={t("footerMessage.buttonText")}
        />
      </main>
    </NextIntlClientProvider>
  );
};

export default MobileServices;
