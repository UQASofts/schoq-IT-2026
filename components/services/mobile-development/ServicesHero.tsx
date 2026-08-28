"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import {
  CurvedLine,
  DashedWireframeGrouped,
  DoubleArrowIcons,
  MobileWireframeGreen,
  MobileWireframePurple,
} from "@/components/icons/Icons";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textHeaderRef = useRef<HTMLDivElement>(null);
  const containerOneButtonRef = useRef<HTMLDivElement>(null);
  const containerTwoRef = useRef<HTMLDivElement>(null);

  const dashedWireframeRef = useRef<HTMLDivElement>(null);
  const curvedLineRef = useRef<HTMLDivElement>(null);
  const doubleArrowsRef = useRef<HTMLDivElement>(null);
  const wireframeGroupRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Mobile.Hero");

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // ----------------------------------------------------
        // 1st Timeline: Container-One
        // ----------------------------------------------------
        const tlOne = gsap.timeline();

        // Text elements slide from above with a bounce
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
            start: "top 70%", // Triggers when top of containerTwo is 30% above bottom of viewport
            toggleActions: "play none none none",
          },
        });

        // a) Dashed Wireframe fades in
        tlTwo.from(dashedWireframeRef.current, {
          opacity: 0,
          duration: 1.0,
          ease: "power2.inOut",
        });

        // b) Double Arrows fade in
        tlTwo.from(
          doubleArrowsRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3",
        );

        // c) Curved Line fades in
        tlTwo.from(
          curvedLineRef.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4",
        );

        // d) Mockups appear from below with fade + slide-in + bounce
        tlTwo.from(
          wireframeGroupRef.current,
          {
            y: 100,
            opacity: 0,
            // duration: 1.2,
            duration: 3,
            // ease: "bounce.out",
            ease: "elastic.out",
          },
          "-=0.7",
        );
      }, containerRef);

      return () => ctx.revert();
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
        {/* Animated Text Container */}
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

        {/* CTA Button (Smooth slide-in without bounce) */}
        <div ref={containerOneButtonRef} className="pt-2">
          <button className="px-6 py-3.5 text-sm sm:text-base font-medium text-white rounded-md bg-linear-to-r from-[#5063ed] via-[#488beb] to-[#45d197] shadow-sm hover:shadow-md hover:opacity-95 transition-all duration-200 cursor-pointer">
            {t("cta")}
          </button>
        </div>
      </div>

      {/* Container-Two: Process Illustration Section */}
      <div
        ref={containerTwoRef}
        className=" w-full max-w-6xl mx-auto mt-8 md:mt-16 px-4 py-6"
      >
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-6 py-8 px-4 w-full">
          {/* 1. Dashed Wireframe SVG */}
          <div
            ref={dashedWireframeRef}
            className="relative z-10 shrink-0 w-fit max-w-xs md:max-w-none flex justify-center"
          >
            <DashedWireframeGrouped />
          </div>

          {/* 2. Curved Line SVG (Hidden on mobile as curved lines break stacked layouts) */}
          <div
            ref={curvedLineRef}
            className="hidden md:flex absolute bottom-25 inset-0 z-0 items-center justify-center pointer-events-none"
          >
            <CurvedLine />
          </div>

          {/* 3. Double Arrow Icons SVG (Rotates down on mobile) */}
          <div
            ref={doubleArrowsRef}
            className="relative z-10 shrink-0 px-1 rotate-90 md:rotate-0"
          >
            <DoubleArrowIcons />
          </div>

          {/* 4. Mockups / Wireframe Group */}
          <div
            ref={wireframeGroupRef}
            className="relative z-10 flex flex-wrap md:flex-nowrap justify-center items-center gap-3"
          >
            <MobileWireframePurple />
            <MobileWireframeGreen />
            <MobileWireframePurple />
            <MobileWireframeGreen />
          </div>
        </div>
      </div>
    </main>
  );
}
