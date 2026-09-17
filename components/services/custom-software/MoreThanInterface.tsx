"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

interface Layer {
  title: string;
  desc: string;
}

export default function MoreThanInterface() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("CustomSoftware.FitSystems");
  const layers = t.raw("layers") as Layer[];

  useGSAP(
    () => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      const cards = cardsRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex w-full items-center justify-center overflow-hidden bg-linear-to-br from-[#eef2ff] via-[#f0f9ff] to-[#ecfdf5] px-[4%] py-global font-sans sm:py-global-sm md:py-global-md lg:px-[8%] lg:py-global-lg xl:py-global-xl 2xl:py-global-2xl"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20">
        <div ref={headingRef} className="space-y-4 max-w-md">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            {t("category")}
          </h3>
          <h2 className="uppercase text-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl">
            {t("title")}
          </h2>
          <p className="text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
            {t("description")}
          </p>
        </div>

        <div ref={cardsRef} className="flex w-full flex-col gap-3">
          {layers.map((layer) => (
            <div
              key={layer.title}
              className="flex w-full items-start justify-between self-stretch bg-white px-[22px] py-[18px] rounded-[14px] border border-[#DFE4EB]"
            >
              <h3 className="shrink-0 text-heading text-h4 sm:text-h4-sm md:text-h4-md lg:text-h4-lg xl:text-h4-xl 2xl:text-h4-2xl">
                {layer.title}
              </h3>
              <p className="text-right text-neutral-400 text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl">
                {layer.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
