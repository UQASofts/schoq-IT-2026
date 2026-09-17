"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

import BeforeImg from "@/public/services/graphic-design/before.png";
import AfterImg from "@/public/services/graphic-design/after.png";
import ArrowImg from "@/public/services/graphic-design/arrow.png";

gsap.registerPlugin(ScrollTrigger);

export default function ComplexToClear() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const visualsRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("GraphicDesign.ComplexToClear");

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

      const visuals = visualsRef.current?.children;
      if (visuals && visuals.length > 0) {
        gsap.from(visuals, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: visualsRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col items-center justify-center overflow-hidden px-[4%] py-[105px] font-sans lg:px-[8%]"
      style={{
        minHeight: "769px",
        background:
          "linear-gradient(90deg, rgba(65, 105, 255, 0.06) 0%, rgba(53, 185, 255, 0.03) 50%, rgba(66, 217, 155, 0.06) 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-7xl space-y-10 md:space-y-14">
        <div ref={headingRef} className="max-w-3xl space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            {t("category")}
          </h3>
          <h2 className="uppercase text-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl">
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
          <p className="max-w-xl text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
            {t("description")}
          </p>
        </div>

        <div
          ref={visualsRef}
          className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8 md:gap-10"
        >
          <div className="w-full max-w-md">
            <Image
              src={BeforeImg}
              alt={t("beforeAlt")}
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="shrink-0 rotate-90 sm:rotate-0">
            <Image
              src={ArrowImg}
              alt={t("arrowAlt")}
              width={39}
              height={54}
              className="h-8 w-auto sm:h-10"
            />
          </div>
          <div className="w-full max-w-md">
            <Image
              src={AfterImg}
              alt={t("afterAlt")}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
