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
      className="min-h-screen bg-white text-slate-900 flex flex-col items-center px-4 justify-start pt-24 pb-16 md:py-24 font-sans selection:bg-purple-100"
    >
      {/* Container-One: Text Header Section */}
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <div ref={textHeaderRef} className="space-y-3">
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-slate-800">
            {t("category")}
          </h3>

          <h1 className="text-3xl sm:text-5xl md:text-5xl font-black tracking-tight leading-[1.08] text-slate-900 uppercase max-w-8xl mx-auto">
            {t("title")}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            {t("description")}
          </p>
        </div>

        {/* CTA Button */}
        <div ref={containerOneButtonRef} className="pt-2">
          <Link
            href="#"
            className="inline-block px-7 py-3 text-sm sm:text-base font-semibold text-white rounded-lg bg-linear-to-r from-[#4A4CE6] via-[#34A1B4] to-[#4BE191] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {t("cta")}
          </Link>
        </div>
      </div>

      {/* Container-Two: Process Illustration Section */}
      <div
        ref={containerTwoRef}
        className="w-full max-w-4xl mx-auto mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 px-4"
      >
        {/* Left Card: Static Page */}
        <div
          ref={leftCol}
          className="w-full md:w-95 h-55 rounded-xl border border-slate-200 bg-white shadow-xs p-6 flex flex-col items-center justify-center text-center"
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
            <ArrowRight className="w-4 h-4 text-slate-400 -ml-2" />
          </div>
        </div>

        {/* Right Card: Dynamic Platform Grid (With Gradient Border) */}
        <div
          ref={rightCol}
          className="w-full md:w-105 h-55 rounded-xl bg-linear-to-r from-[#4A4CE6] via-[#34A1B4] to-[#4BE191] p-[1.5px] shadow-xs"
        >
          <div className="w-full h-full bg-white rounded-[10px] p-5 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-3.5 w-full">
              {/* CMS Block */}
              <div className="h-16 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-xs font-semibold text-slate-700 shadow-2xs">
                {t("rightCard.cms")}
              </div>

              {/* User Auth Block */}
              <div className="h-16 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-xs font-semibold text-slate-700 shadow-2xs">
                {t("rightCard.userAuth")}
              </div>

              {/* Integrations Block */}
              <div className="h-16 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-xs font-semibold text-slate-700 shadow-2xs">
                {t("rightCard.integrations")}
              </div>

              {/* Highlighted Platform Block */}
              <div className="h-16 rounded-lg bg-[#0D52D6] text-white flex items-center justify-center text-xs font-semibold shadow-md">
                {t("rightCard.platform")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
