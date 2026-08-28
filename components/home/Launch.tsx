"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

import { heroBgImage } from "@/public";

gsap.registerPlugin(ScrollTrigger);
const Launch: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const t = useTranslations("Home.Launch");

  const timelineSteps = [
    { week: "1", key: "brief" },
    { week: "2", key: "prototype" },
    { week: "3 - 4", key: "interface" },
    { week: "5 - 6", key: "development" },
    { week: "7", key: "testing" },
    { week: "8", key: "launch" },
  ] as const;
  // const painPoints = ["Freelancer chaos", "Agency chains", "Friction"];
  const painPoints = t.raw("painPoints") as string[];

  useGSAP(
    () => {
      // Determine screen sizes dynamically for ideal travel distances
      const isMobile = window.innerWidth < 768;
      const leftXOffset = isMobile ? -80 : -150;
      const rightXOffset = isMobile ? 80 : 150;

      // --- LEFT COMPONENT 1 (header-one) ---
      gsap.from(".header-one", {
        x: leftXOffset,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".header-one",
          start: "top 90%",
          end: "top 50%",
          // markers: true, // Keep for debugging
          toggleActions: "play none none reset", // Play animation when element enters viewport
        },
      });

      // --- LEFT COMPONENT 2 (header-two) ---
      gsap.from(".header-two", {
        x: leftXOffset,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".header-two",
          start: "top 90%",
          end: "top 55%",
          // markers: true, // Keep for debugging
          toggleActions: "play none none reset",
        },
      });

      // --- RIGHT COMPONENT (header-three) ---
      gsap.from(".header-three", {
        x: rightXOffset,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".header-three",
          start: "top 90%",
          end: "top 55%",
          // markers: true, // Keep for debugging
          toggleActions: "play none none reset",
        },
      });

      // --- TIMELINE SCROLL-DRIVEN STAGGER ---
      gsap.from(".timeline-item", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".timeline-wrapper",
          start: "top 85%",
          end: "bottom 65%",
          // markers: true, // Keep for debugging
          toggleActions: "play none none reset",
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      // style={{ backgroundImage: `url(${heroBgImage.src})` }}
      className="relative bg-linear-to-l from-[#575EE3]/30 via-[#575EE3]/10 to-white w-full lg:pl-6 md:pl-12 lg:pl-20 py-16 md:py-24 lg:py-15 overflow-x-hidden"
    >
      <div className="w-full mx-auto">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-20 xl:pl-50 2xl:pl-80 lg:pt-10">
          {/* Left Block */}
          <div className="flex flex-col gap-5 w-[50%]">
            <h2 className="text-center md:text-start w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
              <br />
              {t("titleLine3")}
            </h2>
            <p className="text-center md:text-start text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              {t("subtitle")}
              <br />
              {t("description")}
            </p>
          </div>

          {/* Right Block */}
          <div className="header-three hidden md:block min-w-0 h-fit rounded-lg bg-linear-to-r from-[#4A4CE6] via-[#34A1B4] to-[#4BE191] px-6 md:px-8 lg:px-10">
            <div className="grid grid-cols-2 items-center gap-4">
              <div
                className={`${t("noLabel") === "KEIN" ? "text-[6rem]" : "text-[5rem]"} font-bold text-white uppercase tracking-wider mb-2 transform scale-y-[1.3] scale-x-[0.85] origin-left`}
              >
                {t("noLabel")}
              </div>

              <div className="min-w-0 lg:block hidden">
                {painPoints.map((point, index) => (
                  <div key={index} className="flex items-center py-1">
                    <span className="text-[1.5rem] text-white font-normal leading-tight tracking-tight break-words">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Block */}
        <div className="timeline-wrapper relative pb-10 z-20">
          {/* Desktop Timeline horizontal bar connecting circles */}
          <div className="w-[90%] xl:w-[93%] 2xl:w-[91%] hidden md:block absolute top-7 right-0 h-0.5 bg-[#575EE3] z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-0 relative">
            {timelineSteps.map((step, index) => (
              <div
                key={step.key}
                className="flex flex-col items-center p-2"
              >
                {/* Desktop view Circle */}
                <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#575EE3] text-white text-sm font-bold relative z-10">
                  {step.week}
                </div>

                {/* Mobile view Card */}
                <div className="bg-white md:hidden w-full gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="text-xs font-medium text-[#000000] uppercase tracking-wider mb-1">
                    {t("timeline.weekPrefix")} {step.week}
                  </div>
                  <div className="text-base font-semibold text-gray-900">
                    {t(`timeline.steps.${step.key}`)}
                  </div>
                </div>

                {/* Desktop view Label below the circle */}
                <div className="hidden md:block mt-3 text-sm font-medium text-[#000000]">
                  {t(`timeline.steps.${step.key}`)}
                </div>

                {/* Mobile view vertical connectors */}
                {/* {index < timelineSteps.length - 1 && (
                  <div className="md:hidden w-px h-6 bg-gray-200 mx-auto" />
                )} */}
              </div>
            ))}
          </div>

          {/* Desktop right-aligned footer element
          <div className="hidden md:flex justify-end mt-8">
            <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
              <span>{t("footerTag")}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div> */}
        </div>
          <div className="absolute bottom-0 left-0 w-full h-80 bg-linear-to-t from-white via-white to-transparent z-0">
          </div>
      </div>
    </section>
  );
};

export default Launch;
