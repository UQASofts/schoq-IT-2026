"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

export default function ImpressumHeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textHeaderRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Impressum.Hero");

  useGSAP(
    () => {
      gsap.from(textHeaderRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "circ.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      style={{ backgroundImage: "url('/projects/project-hero-section.png')" }}
      className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] bg-cover bg-center bg-no-repeat px-[4%] pt-[120px] pb-16 font-sans text-slate-900 selection:bg-purple-100 lg:px-[8%]"
    >
      <div className="mx-auto w-full max-w-6xl space-y-3 text-center md:space-y-4 lg:space-y-5 xl:max-w-7xl">
        <div ref={textHeaderRef} className="space-y-3">
          <h3 className="Conversation mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            {t("category")}
          </h3>

          <h1 className="mx-auto uppercase text-heading text-h1 sm:text-h1-sm md:text-h1-md lg:text-h1-lg xl:text-h1-xl 2xl:text-h1-2xl">
            {t("title")}
          </h1>

          <p className="mx-auto max-w-2xl text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}
