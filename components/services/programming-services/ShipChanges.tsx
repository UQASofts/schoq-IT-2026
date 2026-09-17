"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ShipChanges() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("ProgrammingServices.ShipChanges");
  const steps = t.raw("steps") as string[];

  useGSAP(
    () => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(stepsRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col items-center justify-center overflow-hidden bg-white px-[4%] py-global font-sans sm:py-global-sm md:py-global-md lg:px-[8%] lg:py-global-lg xl:py-global-xl 2xl:py-global-2xl"
    >
      <div className="mx-auto w-full max-w-7xl space-y-8 md:space-y-10">
        <div ref={headingRef} className="max-w-3xl space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            {t("category")}
          </h3>
          <h2 className="uppercase text-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl">
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
          <p className="max-w-2xl text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
            {t("description")}
          </p>
        </div>

        <div
          ref={stepsRef}
          className="flex w-full flex-wrap items-center gap-x-3 gap-y-3 rounded-[20px] border border-[#E6E9EE] bg-white px-5 py-5 sm:gap-x-4 sm:px-7 sm:py-6"
        >
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3 sm:gap-4">
              <span className="inline-flex items-center rounded-full bg-[#F3F4F6] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-heading sm:px-5 sm:text-xs">
                {step}
              </span>
              {index < steps.length - 1 && (
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
