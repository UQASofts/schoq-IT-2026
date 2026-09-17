"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface BlueprintCard {
  number: string;
  title: string;
  desc: string;
}

interface SectionTwoProps {
  descriptionData: BlueprintCard[];
  mainTitle: string;
  mainDesc: string;
}

export default function ServicesSectionTwo({
  descriptionData,
  mainTitle,
  mainDesc,
}: SectionTwoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  const cardsContent = descriptionData;

  useGSAP(
    () => {
      const cards = cardsGridRef.current?.children;
      if (!cards || cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // 1. Heading slide
      tl.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      );

      // 2. Subtitle slide
      tl.fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      );

      // 3. Ultra-smooth card sequence using power3.out and force3D
      tl.fromTo(
        cards,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          force3D: true, // Forces GPU hardware acceleration
          clearProps: "transform,willChange", // Restores CSS hover transform state after animation finishes
        },
        "-=0.3",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full items-center justify-center overflow-hidden bg-white px-[4%] py-global selection:bg-indigo-100 sm:py-global-sm md:py-global-md lg:px-[8%] lg:py-global-lg xl:py-global-xl 2xl:py-global-2xl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-6/7 blur-[186px] rotate-[0.639deg]"
        style={{
          width: "1905.102px",
          height: "474.333px",
          borderRadius: "1905.102px",
          background:
            "linear-gradient(90deg, rgba(87, 94, 227, 0.30) 0%, rgba(86, 213, 154, 0.30) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full space-y-12 md:space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-5xl mx-auto">
          <h2
            ref={headingRef}
            className="uppercase text-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl"
          >
            {mainTitle}
          </h2>
          <p
            ref={descriptionRef}
            className="text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl"
          >
            {mainDesc}
          </p>
        </div>

        {/* Cards Grid Container */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch"
        >
          {cardsContent.map((card) => (
            <div
              key={card.number}
              className="flex flex-1 flex-col items-start gap-4 self-stretch p-6 will-change-[transform,opacity]"
              style={{
                borderRadius: "8.276px",
                background: "rgba(255, 255, 255, 0.20)",
                boxShadow: "0 4.138px 24.828px 0 rgba(0, 0, 0, 0.05)",
              }}
            >
              <span className="text-2xl font-bold tracking-tight text-indigo-400/90">
                {card.number}
              </span>
              <h3 className="text-heading text-h3 sm:text-h3-sm md:text-h3-md lg:text-h3-lg xl:text-h3-xl 2xl:text-h3-2xl">
                {card.title}
              </h3>
              <p className="text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
