"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function Section1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("About.Section1");

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
      className="grid grid-cols-1 md:grid-cols-[40%_60%] grid-rows-1 md:grid-rows-2 flex-1 mt-13 mb-10 bg-white text-foreground relative"
    >
      {/* Vertical divider - hidden on mobile */}
      <div className="hidden md:block absolute left-[40%] top-1/2 -translate-y-1/2 h-[180%] w-0.5 bg-linear-to-r from-emerald-400 to-blue-600 opacity-30 mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)" />

      {/* Horizontal divider - hidden on mobile */}
      {/* <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2" /> */}
      <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-400 to-blue-600 -translate-y-1/2 opacity-30" />

      {/* TOP-LEFT cell - Human Thinking */}
      <div className="human-thinking-2 flex items-center justify-center px-2 py-8 md:py-4 border-b border-gray-100 md:border-none">
        <div
          className={`${t("title2") === "DENKEN" ? "text-3xl md:text-4xl " : "text-3xl"}  font-extrabold uppercase leading-[0.85] tracking-tight text-neutral-900 text-center md:text-left w-full`}
        >
          {t("title1")}
          <br />
          {t("title2")}
        </div>
      </div>

      {/* TOP-RIGHT cell - About Schoq content */}
      <div className="about-schoq-1 flex flex-col justify-center px-6 md:px-8 py-8 md:py-4 gap-2 md:gap-1.5 order-2 md:order-0 text-center md:text-left items-center md:items-start">
        <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-neutral-400">
          {t("aboutSchoq")}
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase leading-[1.2] md:leading-[1.1] text-neutral-900">
          {t("mainHeading.part1")}
          <br />
          {t("mainHeading.part2")}
          <span className="bg-linear-to-r from-emerald-400 to-blue-600 bg-clip-text text-transparent">
            {t("mainHeading.part3")}
            <br />
            {t("mainHeading.part4")}
          </span>
        </h2>

        <p className="about-shoq-content text-sm md:text-xs text-neutral-500 max-w-sm leading-relaxed mt-2 md:mt-1">
          {t("description")}
        </p>
      </div>

      {/* BOTTOM-LEFT cell - empty spacer */}
      <div className="hidden md:block px-8 py-4" />

      {/* BOTTOM-RIGHT cell - Engineered Delivery */}
      <div className="delivery-3 flex items-center justify-center md:justify-start px-4 md:px-8 py-8 md:py-4 order-3 md:order-0">
        <div
          className={`${t("engineeredDelivery1") === "PREZISE" ? "text-5xl sm:text-6xl md:text-5xl " : "text-5xl sm:text-6xl md:text-6xl "} font-extrabold uppercase leading-[0.85] tracking-tight text-neutral-900 text-center md:text-left`}
        >
          {t("engineeredDelivery1")}
          <br />
          {t("engineeredDelivery2")}
        </div>
      </div>
    </section>
  );
}
