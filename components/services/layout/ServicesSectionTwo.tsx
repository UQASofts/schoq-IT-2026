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
      className="w-full min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#eef2ff] via-[#f0f9ff] to-[#ecfdf5] flex items-center justify-center selection:bg-indigo-100"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12 md:space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-5xl mx-auto">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-slate-900 tracking-tight uppercase"
          >
            {mainTitle}
          </h2>
          <p
            ref={descriptionRef}
            className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed"
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
              className="bg-white/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-shadow duration-300 will-change-[transform,opacity] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="block text-2xl font-bold text-indigo-400/90 tracking-tight">
                  {card.number}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {card.title}
                </h3>
              </div>

              <p className="mt-2 text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
