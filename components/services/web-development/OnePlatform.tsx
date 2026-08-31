"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

import LargeScreen from "@/public/services/Large-screen.webp";
import LaptopScreen from "@/public/services/Laptop.webp";
import TabletScreen from "@/public/services/Tablet.webp";

gsap.registerPlugin(ScrollTrigger);

export default function OnePlatform() {
  const mainContainer = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const imageOne = useRef<HTMLDivElement>(null);
  const imageTwo = useRef<HTMLDivElement>(null);
  const imageThree = useRef<HTMLDivElement>(null);
  const textHeaderRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Web.OnePlatform");

  useGSAP(
    () => {
      gsap.from(textHeaderRef.current, {
        yPercent: 35,
        opacity: 0,
        duration: 0.5,
        ease: "circ.out",
        scrollTrigger: {
          trigger: textHeaderRef.current,
          start: "top 80%",
          // markers: true,
          toggleActions: "play none play reverse",
        },
      });

      const timeLine = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainer.current,
          start: "top 75%",
          // markers: true,
          toggleActions: "play none play reverse",
        },
      });

      timeLine.from(imageOne.current, {
        y: 200,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      timeLine.from(
        imageTwo.current,
        {
          y: 200,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.2",
      );
      timeLine.from(
        imageThree.current,
        {
          y: 200,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.2",
      );
    },
    { scope: mainContainer },
  );

  return (
    <section
      ref={mainContainer}
      className="w-full min-screen pt-18 md:pt-24 lg:pt-28 pb-0 px-[4%] lg:px-[8%] bg-linear-to-br from-[#f0f9ff] via-[#eef2ff] to-[#ecfdf5] flex flex-col justify-between font-sans overflow-hidden"
    >
      {/* Section Header */}
      <div
        ref={textHeaderRef}
        className="max-w-4xl w-full mx-auto text-center space-y-3 pt-4"
      >
        <h2 className="uppercase text-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl">
          {t("title")}
        </h2>
        <p className="text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
          {t("subtitle")}
        </p>
      </div>

      {/* Clean Showcase Grid - Touches the bottom edge */}
      <div
        ref={imageContainer}
        className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-end justify-center gap-6 lg:gap-8 pt-10"
      >
        {/* Desktop Preview */}
        <div ref={imageOne} className="w-full md:w-[48%] flex items-end">
          <Image
            src={LargeScreen}
            alt={t("imageAlts.desktop")}
            className="w-full h-auto object-contain drop-shadow-sm block align-bottom"
            priority
          />
        </div>

        {/* Tablet / Dual Laptop Preview */}
        <div ref={imageTwo} className="w-full md:w-[30%] flex items-end">
          <Image
            src={LaptopScreen}
            alt={t("imageAlts.laptop")}
            className="w-full h-auto object-contain drop-shadow-sm block align-bottom"
          />
        </div>

        {/* Mobile / Tablet Preview */}
        <div ref={imageThree} className="w-full md:w-[22%] flex items-end">
          <Image
            src={TabletScreen}
            alt={t("imageAlts.mobile")}
            className="w-full h-auto object-contain drop-shadow-sm block align-bottom"
          />
        </div>
      </div>
    </section>
  );
}
