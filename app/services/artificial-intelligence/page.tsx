import { NextIntlClientProvider } from "next-intl";
import { pick } from "@/lib/pick-messages";
import { getMessages, getTranslations } from "next-intl/server";

import AIHeroSection from "@/components/services/artificial-intelligence/HeroSection";
import ServicesSectionTwo from "@/components/services/layout/ServicesSectionTwo";
import ServicesSectionThree from "@/components/services/layout/ServicesSectionThree";
import ConceptAI from "@/components/services/artificial-intelligence/ConceptAI";
import PracticalAI from "@/components/services/artificial-intelligence/PracticalAI";
import FooterMessage from "@/components/layout/FooterMessage";

interface Opportunity {
  number: string;
  title: string;
  desc: string;
}

interface PracticalAI {
  title: string;
  desc: string;
}

export default async function AiServices() {
  const messages = await getMessages();
  const t = await getTranslations("AI.Page");

  // Section 2
  const opportunity = t.raw("opportunity") as Opportunity[];
  //   {
  //     number: "01",
  //     title: "Discover",
  //     desc: "Identify the workflow, available data and desired outcome.",
  //   },
  //   {
  //     number: "02",
  //     title: "Validate & Architect",
  //     desc: "Test feasibility, sample outputs and review requirements.",
  //   },
  //   {
  //     number: "03",
  //     title: "Build & Integrate",
  //     desc: "Develop the solution and connect it with existing systems.",
  //   },
  //   {
  //     number: "04",
  //     title: "Control & Improve",
  //     desc: "Monitor performance, manage risks and refine the workflow.",
  //   },
  // ];
  const opportunityTitle = t("opportunityTitle");
  const opportunityDesc = t("opportunityDesc");

  // Section 3
  const aiTitle = t("Three.category");
  const aiSubtitle = t("Three.title");
  const practicalAI = t.raw("practicalAI") as PracticalAI[];

  return (
    <NextIntlClientProvider messages={pick(messages, ["AI", "Shared"])}>
      <main className="min-h-screen bg-background text-foreground flex flex-col pt-10">
        <AIHeroSection />
        <ServicesSectionTwo
          descriptionData={opportunity}
          mainTitle={opportunityTitle}
          mainDesc={opportunityDesc}
        />
        <ServicesSectionThree
          descriptionData={practicalAI}
          mainTitle={aiTitle}
          subTitle={aiSubtitle}
        />
        <ConceptAI />
        <PracticalAI />
        <FooterMessage
          description={t("footerMessage.description")}
          buttonText={t("footerMessage.buttonText")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
