"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface QualityItem {
  number: string;
  title: string;
  desc: string;
}

export default function BuiltTomorrow() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("ProgrammingServices.Tomorrow");
  const items = t.raw("items") as QualityItem[];

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

      const rows = listRef.current?.children;
      if (rows && rows.length > 0) {
        gsap.from(rows, {
          x: -60,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 70%",
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
        minHeight: "678px",
        background:
          "linear-gradient(90deg, rgba(65, 105, 255, 0.06) 0%, rgba(53, 185, 255, 0.03) 50%, rgba(66, 217, 155, 0.06) 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-7xl space-y-10 md:space-y-14">
        <div ref={headingRef} className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            {t("category")}
          </h3>
          <h2 className="uppercase text-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl">
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
        </div>

        <div
          ref={listRef}
          className="flex w-full flex-col border-t border-[#E6E9EE]"
        >
          {items.map((item) => (
            <div
              key={item.number}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-[#E6E9EE] py-6 sm:gap-6 md:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1.2fr)_auto] md:gap-8 md:py-7"
            >
              <span className="text-sm font-medium text-indigo-300">
                {item.number}
              </span>
              <h3 className="text-heading text-h4 sm:text-h4-sm md:text-h4-md lg:text-h4-lg xl:text-h4-xl 2xl:text-h4-2xl">
                {item.title}
              </h3>
              <p className="col-span-2 text-neutral-400 text-p-nav sm:text-p-nav-sm md:col-span-1 md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl">
                {item.desc}
              </p>
              <Check className="hidden h-4 w-4 shrink-0 text-neutral-400 md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
