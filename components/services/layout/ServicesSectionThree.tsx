"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// TypeScript interface for engagement cards
interface EngagementCard {
  title: string;
  desc: string;
}

interface SectionThreeProps {
  descriptionData: EngagementCard[];
  mainTitle: string;
  subTitle: string;
}

export default function ServicesSectionThree({
  descriptionData,
  mainTitle,
  subTitle,
}: SectionThreeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Shared.Three");

  const cardsContent = descriptionData;

  useGSAP(
    () => {
      // 1. Main Heading Animation (Triggers at 30% from bottom -> top 70%)
      gsap.fromTo(
        headingRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 70%", // 30% in view from bottom
            toggleActions: "play none none none",
          },
        },
      );

      // 2. Cards Stagger Animation (Triggers at 40% from bottom -> top 60% with scroll reversal)
      const cards = cardsContainerRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            x: -80, // Slide in from left
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.18, // Cards enter one-by-one smoothly
            force3D: true, // Smooth GPU rendering
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 60%", // 40% in view from bottom
              toggleActions: "play none none reverse", // Reverses when scrolling back up
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col items-start justify-center overflow-hidden bg-white py-global font-sans sm:py-global-sm md:py-global-md lg:py-global-lg xl:py-global-xl 2xl:py-global-2xl"
    >
      <div className="w-full px-[4%] lg:px-[8%] space-y-10 md:space-y-12">
        {/* Header Section */}
        <div ref={headingRef} className="Main-Heading space-y-3 text-left">
          <h3 className="Conversation text-xs font-semibold tracking-[0.25em] uppercase text-neutral-500 mb-4">
            {subTitle}
          </h3>
          <h2 className="uppercase text-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl">
            {mainTitle}
          </h2>
        </div>

        {/* Engagement Cards Container */}
        <div ref={cardsContainerRef} className="flex flex-col gap-5 sm:gap-6">
          {cardsContent.map((card, index) => (
            <div
              key={index}
              /* Gradient border effect wrapper */
              className="relative p-[1.5px] rounded-2xl bg-gradient-to-r from-purple-200 via-sky-200 to-emerald-200 hover:from-purple-300 hover:via-sky-300 hover:to-emerald-300 transition-shadow duration-300 shadow-xs [will-change:transform,opacity]"
            >
              {/* Inner card content */}
              <div className="w-full bg-white rounded-[14px] p-6 sm:p-8 md:p-10 flex flex-col justify-center space-y-2.5">
                <h3 className="text-heading text-h3 sm:text-h3-sm md:text-h3-md lg:text-h3-lg xl:text-h3-xl 2xl:text-h3-2xl">
                  {card.title}
                </h3>
                <p className="text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
