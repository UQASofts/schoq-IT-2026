"use client";

import { SingleArrowIcon } from "@/components/icons/Icons";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

// TypeScript interface for Expertise Cards
interface ExpertiseCard {
  id: string;
  firstLine: string;
  secondLine: string;
}

interface ServicesSectionFiveProps {
  descriptionData: ExpertiseCard[];
  mainTitle: string;
  subTitle: string;
}

export default function ServicesSectionFive({
  descriptionData,
  mainTitle,
  subTitle,
}: ServicesSectionFiveProps) {
  const cardContainer = useRef(null);
  const expertiseItems = descriptionData;
  const t = useTranslations("Shared.Five");

  useGSAP(
    () => {
      gsap.from(cardContainer.current, {
        y: 150,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: cardContainer.current,
          start: "top 90%",
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: cardContainer },
  );

  return (
    <section className="flex w-full flex-col items-center justify-center bg-white py-global font-sans px-[4%] lg:px-[8%] sm:py-global-sm md:py-global-md lg:py-global-lg xl:py-global-xl 2xl:py-global-2xl">
      <div className="max-w-7xl w-full mx-auto space-y-12 md:space-y-16 text-center">
        {/* Header Section */}
        <div className="space-y-4 max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-slate-800">
            {subTitle}
          </p>
          <h2 className=" uppercase text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl">
            {mainTitle}
          </h2>
        </div>

        {/* Pill-Shaped Cards Grid */}
        <div
          ref={cardContainer}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 lg:flex-nowrap"
        >
          {expertiseItems.map((item) => (
            <div
              key={item.id}
              className="flex w-[calc(50%-0.75rem)] justify-center md:w-[calc(33.333%-1rem)] lg:w-auto lg:max-w-none lg:flex-1"
            >
              {/* Card Container */}
              <div className="group relative w-full max-w-[200px] aspect-4/5 rounded-[90px] p-[1.5px] bg-gradient-to-br from-indigo-200 via-sky-200 to-emerald-200 hover:from-indigo-300 hover:via-sky-300 hover:to-emerald-300 transition-all duration-300 shadow-xs cursor-pointer mx-auto">
                {/* Inner Content */}
                <div className="w-full h-full bg-white/60 backdrop-blur-xs rounded-[88.5px] p-3 sm:p-5 flex flex-col items-center justify-center space-y-2 sm:space-y-4 hover:bg-white/90 transition-all duration-300">
                  {/* Arrow Icon */}
                  <div className="text-slate-700 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <SingleArrowIcon />
                  </div>

                  {/* Gradient Title Text */}
                  <div className="text-center font-bold text-xs sm:text-base leading-tight uppercase tracking-tight">
                    <span className="block bg-global bg-clip-text text-transparent">
                      {item.firstLine}
                    </span>
                    <span className="block bg-global bg-clip-text text-transparent">
                      {item.secondLine}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
