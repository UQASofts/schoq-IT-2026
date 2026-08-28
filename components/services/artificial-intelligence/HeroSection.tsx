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
      className="min-h-screen bg-white text-slate-900 flex flex-col items-center px-4 justify-start pt-24 pb-16 md:py-24 font-sans selection:bg-purple-100"
    >
      {/* Container-One: Text Header Section */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div ref={textHeaderRef} className="space-y-4">
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-slate-800">
            {t("category")}
          </h3>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-slate-900 uppercase max-w-4xl mx-auto">
            {t("title1")}
            <br />
            {t("title2")}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            {t("description")}
          </p>
        </div>

        {/* CTA Button */}
        <div ref={containerOneButtonRef} className="pt-2">
          <Link
            href="#"
            className="inline-block px-7 py-3.5 text-sm sm:text-base font-medium text-white rounded-md bg-linear-to-r from-[#5063ed] via-[#3b82f6] to-[#10b981] shadow-sm hover:shadow-md hover:opacity-95 transition-all duration-200 cursor-pointer"
          >
            {t("cta")}
          </Link>
        </div>
      </div>

      {/* Container-Two: Process Illustration Section */}
      <div
        ref={containerTwoRef}
        className="w-full max-w-3xl mx-auto mt-10 sm:mt-12 md:mt-16 relative rounded-xl sm:rounded-2xl overflow-hidden  shadow-xl "
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
