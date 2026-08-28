"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

import Frame120 from "@/public/about/Frame 120.svg";
import Adnan from "@/public/about/adnan.svg";
import Qasim from "@/public/about/qasim.svg";
import Ubaid from "@/public/about/ubaid.svg";
import BgImage from "@/public/about/about-bg-image.webp";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section2() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations("About.Section2");

  useGSAP(
    () => {
      // Ensure GSAP context cleanup for React strict mode / re-renders
      const ctx = gsap.context(() => {
        // -------------------------------------------------------------
        // 1st Animation: Container-One
        // Triggers when top of Container-One reaches 70% from top of viewport (30% from bottom)
        // -------------------------------------------------------------
        const tlOne = gsap.timeline({
          scrollTrigger: {
            trigger: ".Container-One",
            start: "top 60%", // 40% viewport from bottom
            toggleActions: "play none none reverse",
          },
        });

        tlOne
          .from(".Techonology-Text", {
            x: -80,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          })
          .from(
            ".Group-Image",
            {
              x: 80,
              opacity: 0,
              duration: 1.2,
              ease: "power3.out",
            },
            "<",
          ); // Run concurrently with Techonology-Text

        // -------------------------------------------------------------
        // 2nd Animation: Container-Two
        // Triggers when top of Container-Two reaches 50% from top of viewport (50% from bottom)
        // -------------------------------------------------------------
        gsap.from(".Container-Two > div", {
          scrollTrigger: {
            trigger: ".Container-Two",
            start: "top 50%", // 50% viewport from bottom
            end: "bottom 70%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.2, // Stagger cards sequentially for smooth minimal look
          ease: "power2.out",
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      style={{ backgroundImage: `url(${BgImage.src})` }}
      className="min-h-screen bg-cover bg-center bg-no-repeat text-foreground flex flex-col justify-between px-6 py-12 md:px-16 md:py-16 bg-white/80 bg-blend-overlay z-1"
    >
      {/* TOP ROW: Text Content (Left) & Group Photo (Right) */}
      <div className="Container-One grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-4">
        {/* TOP-LEFT cell: Main content */}
        <div className="Techonology-Text flex items-center justify-center p-6 md:p-8">
          <div className="max-w-xl">
            <h2 className="text-lg sm:text-xl md:text-3xl font-extrabold uppercase leading-tight text-neutral-900 mb-4 md:mb-6">
              {t("heading")}
            </h2>
            <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        {/* TOP-RIGHT cell: Group photo frame */}
        <div className="Group-Image flex items-center justify-center p-6 md:p-8">
          <Image
            src={Frame120}
            alt={"Leaders"}
            height={300}
            width={500}
            className="w-full h-auto object-contain max-w-md md:max-w-lg grayscale hover:grayscale-0 duration-300 ease-in-out transition-all"
            priority
          />
        </div>
      </div>

      {/* BOTTOM ROW: Team member cards side-by-side in 3 columns */}
      <div className="Container-Two grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 p-6 md:p-8">
        {/* Managing Director */}
        <div className="bg -red-400 flex flex-col items-center text-center">
          <div className="mb-4 relative w-full max-w-64 aspect-square flex items-end justify-center">
            <Image
              src={Adnan}
              alt={"Adnan Javed"}
              height={220}
              width={220}
              className="object-contain grayscale hover:grayscale-0 duration-300 ease-in-out transition-all"
              priority
            />
          </div>
          <p className="text-sm sm:text-base font-extrabold tracking-widest uppercase text-neutral-900">
            {t("team.managingDirector")}
          </p>
          <p className="text-sm font-bold uppercase bg-linear-to-r from-emerald-400 to-blue-600 bg-clip-text text-transparent mt-1">
            ADNAN JAVED
          </p>
        </div>

        {/* Chief Executive Officer */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 relative w-full max-w-64 aspect-square flex items-end justify-center">
            <Image
              src={Qasim}
              alt={"M. Qasim"}
              height={220}
              width={220}
              className="object-contain grayscale hover:grayscale-0 duration-300 ease-in-out transition-all"
              priority
            />
          </div>
          <p className="text-sm sm:text-base font-extrabold tracking-widest uppercase text-neutral-900">
            {t("team.ceo")}
          </p>
          <p className="text-sm font-bold uppercase bg-linear-to-r from-emerald-400 to-blue-600 bg-clip-text text-transparent mt-1">
            M. QASIM
          </p>
        </div>

        {/* Director */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 relative w-full max-w-64 aspect-square flex items-end justify-center">
            <Image
              src={Ubaid}
              alt={"Ubaid Farooq"}
              height={220}
              width={220}
              className="object-contain grayscale hover:grayscale-0 duration-300 ease-in-out transition-all"
              priority
            />
          </div>
          <p className="text-sm sm:text-base font-extrabold tracking-widest uppercase text-neutral-900">
            {t("team.director")}
          </p>
          <p className="text-sm font-bold uppercase bg-linear-to-r from-emerald-400 to-blue-600 bg-clip-text text-transparent mt-1">
            UBAID FAROOQ
          </p>
        </div>
      </div>
    </section>
  );
}
