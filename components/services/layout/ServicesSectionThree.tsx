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
      className="w-full bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans overflow-hidden"
    >
      <div className="max-w-5xl w-full mx-auto space-y-10 md:space-y-12">
        {/* Header Section */}
        <div ref={headingRef} className="Main-Heading space-y-3 text-left">
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-slate-800">
            {subTitle}
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
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
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
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
