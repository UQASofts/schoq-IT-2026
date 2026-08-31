"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function SectionMain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textHeaderRef = useRef<HTMLDivElement>(null);
  const containerOneButtonRef = useRef<HTMLDivElement>(null);
  const containerTwoRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Web.Hero");

  const leftCol = useRef<HTMLDivElement>(null);
  const rightCol = useRef<HTMLDivElement>(null);

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
        containerOneButtonRef.current,
        {
          yPercent: -120,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "<",
      );

      // ----------------------------------------------------
      // 2nd Timeline: Container-Two (Triggers at 30% into viewport)
      // ----------------------------------------------------
      const tlTwo = gsap.timeline({
        scrollTrigger: {
          trigger: containerTwoRef.current,
          start: "top 75%",
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });
      tlTwo.from(leftCol.current, {
        x: 200,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
      });
      tlTwo.from(
        rightCol.current,
        {
          x: -200,
          opacity: 0,
          duration: 0.9,
          ease: "power4.out",
        },
        "<0.05",
      );
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center bg-white px-[4%] lg:px-[8%] pt-[120px] pb-16 font-sans text-slate-900 selection:bg-purple-100"
    >
      {/* Container-One: Text Header Section */}
      <div className="mx-auto w-full max-w-6xl text-center space-y-3 md:space-y-4 lg:space-y-5 xl:max-w-7xl">
        <div ref={textHeaderRef} className="space-y-3">
          <h3 className="Conversation text-xs font-semibold tracking-[0.25em] uppercase text-neutral-500 mb-4">
            {t("category")}
          </h3>

          <h1 className="mx-auto uppercase text-heading text-h1 sm:text-h1-sm md:text-h1-md lg:text-h1-lg xl:text-h1-xl 2xl:text-h1-2xl">
            {t("title")}
          </h1>

          <p className="mx-auto max-w-2xl text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
            {t("description")}
          </p>
        </div>

        {/* CTA Button */}
        <div ref={containerOneButtonRef} className="pt-2">
          <Link
            href="#"
            className="inline-block cursor-pointer bg-global px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:text-base rounded-global sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
          >
            {t("cta")}
          </Link>
        </div>
      </div>

      {/* Container-Two: Process Illustration Section */}
      <div
        ref={containerTwoRef}
        className="mx-auto mt-8 flex w-full max-w-7xl flex-col items-center justify-center gap-6 sm:gap-6 md:mt-16 md:flex-row md:gap-2 lg:mt-20 lg:gap-4 xl:gap-10 2xl:gap-8"
      >
        {/* Left Card: Static Page */}
        <div
          ref={leftCol}
          className="w-full md:w-8xl h-40 md:h-55 rounded-xl border border-slate-200 bg-white shadow-xs p-6 flex flex-col items-center justify-center text-center"
        >
          {/* Small Top Bar Decorative Graphic */}
          <div className="w-16 h-1.5 bg-slate-300 rounded-full mb-8" />
          <h4 className="text-lg font-medium text-slate-800 mb-1">
            {t("leftCard.title")}
          </h4>
          <span className="text-[10px] sm:text-xs font-medium tracking-widest text-slate-400 uppercase">
            {t("leftCard.subtitle")}
          </span>
        </div>

        {/* Center: Dashed Arrow Line */}
        <div className="flex items-center justify-center py-2 md:py-0">
          <div className="flex items-center gap-1 text-slate-300">
            <div className="border-t-2 border-dashed border-slate-300 w-16 md:w-24" />
            <img src="/arrow-right.png" alt="Arrow Right" className="h-full w-full text-slate-400 -ml-2" />
          </div>
        </div>

        {/* Right Card: Dynamic Platform Grid (With Gradient Border) */}
        <div
          ref={rightCol}
          className="w-full md:w-8xl h-40 md:h-55 rounded-xl bg-global p-[1.5px] shadow-xs"
        >
          <div className="w-full h-full bg-white rounded-[10px] p-5 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-3.5 w-full">
              {/* CMS Block */}
              <div className="md:h-16 h-12 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-xs font-semibold text-slate-700 shadow-2xs">
                {t("rightCard.cms")}
              </div>

              {/* User Auth Block */}
              <div className="md:h-16 h-12 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-xs font-semibold text-slate-700 shadow-2xs">
                {t("rightCard.userAuth")}
              </div>

              {/* Integrations Block */}
              <div className="md:h-16 h-12 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-xs font-semibold text-slate-700 shadow-2xs">
                {t("rightCard.integrations")}
              </div>

              {/* Highlighted Platform Block */}
              <div className="md:h-16 h-12 rounded-lg bg-[#0D52D6] text-white flex items-center justify-center text-xs font-semibold shadow-md">
                {t("rightCard.platform")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
