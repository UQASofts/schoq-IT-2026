"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

import Image from "next/image";
import HeroImg from "@/public/services/Hero-part-main.webp";
import HeroImgFragment1 from "@/public/services/Hero-part-1.webp";
import HeroImgFragment2 from "@/public/services/Hero-part-2.webp";

gsap.registerPlugin(ScrollTrigger);

export default function AIHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textHeaderRef = useRef<HTMLDivElement>(null);
  const containerOneButtonRef = useRef<HTMLDivElement>(null);
  const containerTwoRef = useRef<HTMLDivElement>(null);

  const mainImgRef = useRef<HTMLDivElement>(null);
  const part1Ref = useRef<HTMLDivElement>(null);
  const part2Ref = useRef<HTMLDivElement>(null);
  const t = useTranslations("AI.Hero");

  useGSAP(
    () => {
      // 1st Timeline: Header & Button Entrance
      const tlOne = gsap.timeline();
      tlOne.from(textHeaderRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "circ.out",
      });
      tlOne.from(
        containerOneButtonRef.current,
        {
          yPercent: -120,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "<",
      );

      // 2nd Timeline: Background and Overlays
      const mm = gsap.matchMedia();

      // Desktop and Mobile Animation Breakpoints
      mm.add("(min-width: 0px)", () => {
        const isMobile = window.innerWidth < 768;

        const tlTwo = gsap.timeline({
          scrollTrigger: {
            trigger: containerTwoRef.current,
            start: isMobile ? "top 85%" : "top 65%",
            toggleActions: "play none none reverse",
          },
        });

        // Main Background Image: Fades in from below with clip-path
        tlTwo.fromTo(
          mainImgRef.current,
          {
            yPercent: 60,
            opacity: 0,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 0% 75%)",
          },
          {
            yPercent: 0,
            opacity: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.2,
            ease: "power3.out",
          },
        );

        // Part 1: Emerges outward from the center (invisible wall effect)
        tlTwo.from(
          part1Ref.current,
          {
            xPercent: 20,
            opacity: 0,
            filter: "blur(10px)",
            ease: "power2.out",
            duration: isMobile ? 0.7 : 0.9,
          },
          "-=0.7",
        );

        // Part 2: Emerges outward from the center (invisible wall effect)
        tlTwo.from(
          part2Ref.current,
          {
            xPercent: 20,
            opacity: 0,
            filter: "blur(10px)",
            ease: "power2.out",
            duration: isMobile ? 0.7 : 0.9,
          },
          "-=0.5",
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center bg-white px-[4%] pt-[120px] pb-16 font-sans text-slate-900 selection:bg-purple-100 lg:px-[8%]"
    >
      {/* Container-One: Text Header Section */}
      <div className="mx-auto w-full max-w-6xl space-y-3 text-center md:space-y-4 lg:space-y-5 xl:max-w-7xl">
        <div ref={textHeaderRef} className="space-y-3">
          <h3 className="Conversation mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            {t("category")}
          </h3>

          <h1 className="mx-auto uppercase text-heading text-h1 sm:text-h1-sm md:text-h1-md lg:text-h1-lg xl:text-h1-xl 2xl:text-h1-2xl">
            {t("title1")}
            <br />
            {t("title2")}
          </h1>

          <p className="mx-auto max-w-2xl text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
            {t("description")}
          </p>
        </div>

        {/* CTA Button */}
        <div ref={containerOneButtonRef} className="pt-2">
          <Link
            href="/contact"
            className="inline-block cursor-pointer bg-global px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:text-base rounded-global sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
          >
            {t("cta")}
          </Link>
        </div>
      </div>

      {/* Container-Two: Process Illustration Section */}
      <div
        ref={containerTwoRef}
        className="relative mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-xl shadow-xl sm:rounded-2xl md:mt-16 lg:mt-20"
      >
        <div className="relative w-full aspect-4/3 sm:aspect-16/10 md:aspect-21/9 min-h-80 flex items-center justify-center overflow-hidden">
          {/* Main Background Image */}
          <div ref={mainImgRef} className="absolute inset-0 w-full  h-full">
            <Image
              src={HeroImg}
              alt={t("imageAlts.main")}
              fill
              priority
              className="object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Part 1 Overlay: Process Flow Pill */}
          <div
            ref={part1Ref}
            className="absolute top-[12%] sm:top-[16%] left-1/2 -translate-x-1/2 z-20 w-[85%] sm:w-[65%] md:w-[50%] pointer-events-none drop-shadow-md origin-center"
          >
            <Image
              src={HeroImgFragment1}
              alt={t("imageAlts.fragment1")}
              width={600}
              height={120}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Part 2 Overlay: Review Required Card Modal */}
          <div
            ref={part2Ref}
            className="absolute top-[36%] sm:top-[38%] left-1/2 -translate-x-1/2 z-30 w-[92%] sm:w-[78%] md:w-[60%] pointer-events-none drop-shadow-2xl origin-center"
          >
            <Image
              src={HeroImgFragment2}
              alt={t("imageAlts.fragment2")}
              width={700}
              height={280}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
