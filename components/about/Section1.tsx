"use client";

import { useRef } from "react";
import { Geist } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations, useLocale } from "next-intl";

const geist = Geist({
  subsets: ["latin"],
  weight: "500",
});

gsap.registerPlugin(ScrollTrigger);

export default function Section1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("About.Section1");
  const isDe = useLocale() === "de";

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Create a master timeline linked to scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // Triggers when top of section hits 80% of viewport height
            toggleActions: "play none none reverse",
          },
        });

        // 1st: "about-schoq-1" slide-fades in from the right with "about-shoq-content" following it
        tl.from(".about-schoq-1", {
          x: 60,
          opacity: 0,
          duration: 2,
          ease: "power3.out",
        }).from(
          ".about-shoq-content",
          {
            x: 30,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=2", // Millisecond delay relative to previous animation start
        );

        // 2nd: "human-thinking-2" slides out from behind the vertical line (revealing rightwards)
        tl.from(
          ".human-thinking-2",
          {
            x: 80,
            opacity: 0,
            clipPath: "inset(0% 0% 0% 100%)", // Fully hidden from the right edge
            duration: 1,
            ease: "power3.out",
          },
          "-=0.3",
        );

        // 3rd: "delivery-3" slides out from behind the vertical line (revealing leftwards)
        tl.from(
          ".delivery-3",
          {
            x: -80,
            opacity: 0,
            clipPath: "inset(0% 100% 0% 0%)", // Fully hidden from the left edge
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4",
        );
      }, containerRef);

      // Clean up GSAP animations on unmount
      return () => ctx.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative grid h-auto grid-cols-1 overflow-x-clip bg-white pt-[170px] md:pt-[100px] text-foreground md:h-screen md:grid-cols-[40%_60%] md:grid-rows-[1.25fr_0.75fr]"
    >
      <div className="hidden md:block absolute left-[40%] top-1/2 -translate-y-1/2 h-[180%] w-0.5 bg-linear-to-r from-emerald-400 to-blue-600 opacity-30 mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)" />

      <div className="hidden md:block absolute top-[64%] left-0 right-0 h-0.5 bg-linear-to-r from-emerald-400 to-blue-600 -translate-y-1/2 opacity-30" />

      <div className="human-thinking-2 flex items-end justify-center border-b border-gray-100 px-2 pb-8 pt-4 md:items-center md:border-none md:px-0 md:py-4">
        <div
          className={`w-full text-center uppercase text-heading md:text-left text-h1 sm:text-h1-sm md:text-h1-md ${
            isDe
              ? "pl-3 sm:pl-4 md:pl-2 lg:pl-4 xl:pl-6 2xl:pl-12 md:text-h1-sm lg:text-h1-md xl:text-h1-lg 2xl:text-h1-xl"
              : "sm:pl-8 md:pl-10 lg:pl-[72px] xl:pl-24 2xl:pl-[200px] lg:text-h1-lg xl:text-h1-xl 2xl:text-h1-2xl"
          }`}
        >
          {t("title1")}
          <br />
          {t("title2")}
        </div>
      </div>

      <div className="about-schoq-1 flex flex-col justify-end px-6 pb-8 md:pl-12 md:pb-12 lg:pl-18 lg:pb-18 order-2 md:order-0 text-center md:text-left items-center md:items-start space-y-3 md:space-y-2">
        <p
          className={`${geist.className} self-stretch text-[16px] font-medium not-italic uppercase leading-[90%] tracking-[5px] text-heading`}
        >
          {t("aboutSchoq")}
        </p>

        <h2 className="uppercase leading-[1.2] md:leading-[1.1] tracking-tight text-neutral-900 text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl">
          {t("mainHeading.part1")}
          <br />
          {t("mainHeading.part2")}
          <span className="bg-global bg-clip-text text-transparent">
            {t("mainHeading.part3")}
            <br />
            {t("mainHeading.part4")}
          </span>
        </h2>

        <p className="about-shoq-content max-w-md text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
          {t("description")}
        </p>
      </div>

      <div className="hidden md:block px-8 py-4" />

      <div className="delivery-3 flex items-start justify-center md:justify-start md:pl-12 lg:pl-18 py-6 order-3 md:order-0 gap-0 md:gap-4 xl:gap-28 2xl:gap-32">
        <div
          className="text-h1 sm:text-h1 md:text-h1-xs lg:text-h1-sm xl:text-h1-md 2xl:text-h1-lg font-extrabold uppercase leading-[0.85] tracking-tight text-neutral-900 text-center md:text-left"
        >
          {t("engineeredDelivery1")}
          <br />
          {t("engineeredDelivery2")}
        </div>
        <div className="hidden md:block w-[160px] shrink-0 lg:w-[200px] xl:w-[240px]">
          <img src="/engineering-delivered.png" alt="Engineered Delivery" className="h-[70%] xl:h-[80%] 2xl:h-[90%] w-[70%] xl:w-[80%] 2xl:w-[90%] object-contain" />
        </div>
      </div>
    </section>
  );
}
