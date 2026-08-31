"use client";

import { useRef } from "react";
import { Geist } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

const geist = Geist({
  subsets: ["latin"],
  weight: "700",
});

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
          toggleActions: "play none none reset",
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
          toggleActions: "play none none reset",
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative w-full overflow-hidden bg-white"
    >
      <div className="relative flex w-full flex-col h-auto lg:h-[580px] xl:h-[640px]">
        <div className="flex flex-1 flex-col justify-center py-12 lg:py-0 pl-[4%] sm:pt-20 lg:pt-0 md:pl-[8.61%]">        
            <div className="relative w-full">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
            <div
              className="absolute top-10 2xl:-top-32  -right-30 md:-right-40 h-[450px] blur-[156px] w-[100%] origin-center -translate-y-62 rounded-[869px] rotate-[21.142deg] scale-50 md:scale-75 lg:scale-100"
              style={{
                background:
                  "linear-gradient(90deg, rgba(87, 94, 227, 0.50) 0%, rgba(86, 213, 154, 0.50) 100%)",
              }}
            />
          </div>
          <div className="relative z-10">
            <div className="w-full max-w-[524px]">
              <h2
                className={`${geist.className} header-one text-h1 uppercase text-heading sm:text-h1-sm md:text-h1-md lg:text-h1-lg xl:text-h1-xl 2xl:text-h1-2xl`}
              >
                {t("titleLine1")}
                <br />
                {t("titleLine2")}
                <br />
                {t("titleLine3")}
              </h2>

            </div>
            <div className="mt-8 flex justify-end lg:absolute lg:inset-y-0 lg:right-0 lg:z-30 lg:mt-0 lg:items-center">
              <div className="header-three flex h-[150px] w-[min(100%,547px)] items-center rounded-r-none bg-global px-6 sm:h-[210px] sm:px-8 md:h-[200px] md:w-[550px] md:px-10 lg:w-[520px] xl:w-[550px] rounded-l-global sm:rounded-l-global-sm md:rounded-l-global-md lg:rounded-l-global-lg xl:rounded-l-global-xl 2xl:rounded-l-global-2xl">
                <div className="flex h-full w-full items-center gap-2">
                  <div
                    className={`${geist.className} origin-left shrink-0 scale-x-[0.85] scale-y-[2] text-[3.5rem] font-bold leading-none text-white uppercase tracking-wider sm:text-[4.5rem] md:text-[5rem] ${t("noLabel") === "KEIN" ? "md:text-[6rem]" : ""}`}
                  >
                    {t("noLabel")}
                  </div>
                  <div className="min-w-0">
                    {painPoints.map((point) => (
                      <div key={point} className="py-0.5 sm:py-1">
                        <span className="text-base leading-tight font-semibold tracking-tight text-white sm:text-xl md:text-[1.5rem]">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
          <div className="">
            <p className="header-two mt-4 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
              {t("subtitle")}
              <br />
              {t("description")}
            </p>
          </div>
        </div>



        <div className="timeline-wrapper relative z-20 px-[4%]">
          <div className="relative hidden md:block">
            <div className="absolute top-5 right-[8.333%] left-[8.333%] h-0.5 bg-[#575EE3]" />
            <div className="relative grid grid-cols-6 ">
              {timelineSteps.map((step) => (
                <div
                  key={step.key}
                  className="timeline-item flex flex-col items-center"
                >
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#575EE3] text-sm font-bold text-white">
                    {step.week}
                  </div>
                  <div className="mt-3 text-heading text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
                    {t(`timeline.steps.${step.key}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
            {timelineSteps.map((step) => (
              <div
                key={step.key}
                className="timeline-item rounded-global border border-gray-100 bg-white p-4"
              >
                <div className="mb-1 text-xs font-medium tracking-wider text-[#696B78] uppercase">
                  {t("timeline.weekPrefix")} {step.week}
                </div>
                <div className="text-base font-semibold text-[#1A1B21]">
                  {t(`timeline.steps.${step.key}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Launch;
