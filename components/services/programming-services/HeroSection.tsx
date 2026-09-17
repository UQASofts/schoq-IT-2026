"use client";

import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

import HeroImg from "@/public/services/programming-service.png";

export default function ProgrammingHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textHeaderRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("ProgrammingServices.Hero");

  useGSAP(
    () => {
      const tlOne = gsap.timeline();
      tlOne.from(textHeaderRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "circ.out",
      });
      tlOne.from(
        ctaButtonRef.current,
        {
          yPercent: -120,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "<",
      );
      tlOne.from(
        imageContainerRef.current,
        {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-[4%] pt-[120px] pb-16 font-sans text-slate-900 selection:bg-purple-100 lg:px-[8%]"
    >
      <div className="mx-auto w-full max-w-6xl space-y-3 text-center md:space-y-4 lg:space-y-5 xl:max-w-7xl">
        <div ref={textHeaderRef} className="space-y-3">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            {t("category")}
          </h3>

          <h1 className="mx-auto uppercase text-heading text-h1 sm:text-h1-sm md:text-h1-md lg:text-h1-lg xl:text-h1-xl 2xl:text-h1-2xl">
            {t("title1")}
            <br />
            {t("title2")}
          </h1>

          <p className="mx-auto max-w-2xl text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
            {t("description")}
          </p>
        </div>

        <div ref={ctaButtonRef} className="pt-2">
          <Link
            href="/contact"
            className="inline-block cursor-pointer bg-global px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:text-base rounded-global sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
          >
            {t("cta")}
          </Link>
        </div>
      </div>

      <div
        ref={imageContainerRef}
        className="relative mx-auto mt-8 w-full max-w-4xl md:mt-16 lg:mt-20 xl:mt-24"
      >
        <div className="relative w-full overflow-hidden rounded-global sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl">
          <Image
            src={HeroImg}
            alt={t("imageAlt")}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </main>
  );
}
