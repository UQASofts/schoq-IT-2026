"use client";

import Image from "next/image";
import { useRef } from "react";
import PhoneBG from "@/public/services/phone-bg.webp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProductDemonstration() {
  const sectionHeader = useRef(null);
  const containerHeader = useRef(null);
  const t = useTranslations("Mobile.ProductDemo");

  useGSAP(() => {
    gsap.fromTo(
      containerHeader.current,
      {
        y: 150,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionHeader.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  return (
    <section
      ref={sectionHeader}
      className="containerHeader w-full min-h-[80%] py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#f0f9ff] via-[#eef2ff] to-[#ecfdf5] flex items-center justify-center font-sans"
    >
      <div
        ref={containerHeader}
        className="max-w-6xl w-full mx-auto space-y-10 md:space-y-14 flex flex-col items-center"
      >
        {/* Section Header */}
        <div className=" text-center space-y-2">
          <h2 className="uppercase text-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl">
            {t("title")}
          </h2>
        </div>

        {/* Image Frame Container */}
        <div className="w-full lg:w-3/4 relative p-2 sm:p-4 md:p-6  rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-slate-900 bg-slate-900 shadow-2xl overflow-hidden group">
          <div className="relative w-full aspect-video ">
            <Image
              src={PhoneBG}
              alt={t("imageAlts.mockup")}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1152px"
              priority
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.01]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
