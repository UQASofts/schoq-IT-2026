"use client";

import { useRef } from "react";
import Link from "next/link";
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
      className="flex min-h-screen flex-col items-center justify-center bg-white px-[4%] pt-[120px] pb-16 font-sans text-slate-900 selection:bg-purple-100 lg:px-[8%]"
    >
      {/* Container-One: Text Header Section */}
      <div className="mx-auto w-full max-w-6xl space-y-3 text-center md:space-y-4 lg:space-y-5 xl:max-w-7xl">
        {/* Animated Text Container */}
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

        {/* CTA Button */}
        <div ref={containerOneButtonRef} className="pt-2">
          <Link
            href="/contact"
            className="inline-block cursor-pointer bg-global px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:text-base rounded-global sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
          >
            {t("cta")}
          </Link>
        </div>
      </div>

      {/* Container-Two: Process Illustration Section */}
      <div
        ref={containerTwoRef}
        className="relative mx-auto mt-8 flex w-full max-w-7xl flex-col items-center justify-center gap-6 sm:gap-6 md:mt-16 md:flex-row md:gap-2 lg:mt-20 lg:gap-3 xl:gap-5 2xl:gap-8"
      >
          {/* 1. Dashed Wireframe SVG */}
          <div
            ref={dashedWireframeRef}
            className="relative z-10 flex w-full max-w-[240px] shrink-0 justify-center sm:max-w-[280px] md:max-w-[220px] lg:max-w-[260px] xl:max-w-[340px] 2xl:max-w-[440px] [&>svg]:h-auto [&>svg]:w-full"
          >
            <DashedWireframeGrouped />
          </div>

          {/* 2. Curved Line SVG (Hidden on small screens as curved lines break stacked layouts) */}
          <div
            ref={curvedLineRef}
            className="pointer-events-none absolute inset-0 z-0 hidden items-center justify-center md:flex [&>svg]:h-auto [&>svg]:w-full"
          >
            <CurvedLine />
          </div>

          {/* 3. Double Arrow Icons SVG (Rotates down on small screens) */}
          <div
            ref={doubleArrowsRef}
            className="relative z-10 shrink-0 rotate-90 px-1 md:rotate-0"
          >
            <DoubleArrowIcons />
          </div>

          {/* 4. Mockups / Wireframe Group */}
          <div
            ref={wireframeGroupRef}
            className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:flex-nowrap md:gap-2 xl:gap-3 [&>svg]:h-[150px] [&>svg]:w-auto sm:[&>svg]:h-[170px] md:[&>svg]:h-[140px] lg:[&>svg]:h-[160px] xl:[&>svg]:h-[190px] 2xl:[&>svg]:h-[222px]"
          >
            <MobileWireframePurple />
            <MobileWireframeGreen />
            <MobileWireframePurple />
            <MobileWireframeGreen />
          </div>
      </div>
    </main>
  );
}
