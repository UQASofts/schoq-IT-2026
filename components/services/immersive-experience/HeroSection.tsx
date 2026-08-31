"use client";

import { useRef } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image1 from "@/public/services/IE1.webp"; // Main Chair/Room visual
import Image2 from "@/public/services/IE2.webp"; // Ergonomic Design card
import Image3 from "@/public/services/IE3.webp"; // Material selection card
import Image4 from "@/public/services/IE4.webp"; // Specs card
import Image5 from "@/public/services/IE5.webp"; // Drag/Scroll control bar
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

// TypeScript Interface for Process Sidebar Items
interface ProcessStep {
  id: string;
  image: StaticImageData;
  alt: string;
  showConnector?: boolean;
}

const SIDEBAR_STEPS: ProcessStep[] = [
  {
    id: "ergonomic",
    image: Image2,
    alt: "Ergonomic Design Overview",
    showConnector: true,
  },
  {
    id: "materials",
    image: Image3,
    alt: "Material & Fabric Options",
    showConnector: true,
  },
  {
    id: "specs",
    image: Image4,
    alt: "Product Specifications Card",
    showConnector: false,
  },
  {
    id: "controls",
    image: Image5,
    alt: "Interactive Controls Bar",
    showConnector: false,
  },
];

export default function ImmersiveHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textHeaderRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const showcaseContainerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const sidebarItemsRef = useRef<HTMLDivElement[]>([]);
  const t = useTranslations("ImmersiveExperience.Hero");

  // GSAP
  useGSAP(
    () => {
      // 1. Hero Text & CTA Entry Animation
      const tlOne = gsap.timeline();
      tlOne.from(textHeaderRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "circ.out",
      });
      tlOne.from(
        ctaButtonRef.current,
        {
          yPercent: -120,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "<",
      );

      // 2. Section 2 ScrollTrigger Sequence
      if (showcaseContainerRef.current) {
        const section2Timeline = gsap.timeline({
          scrollTrigger: {
            trigger: showcaseContainerRef.current,
            start: "top 70%", // Triggers when the image container is 70% from the top
            toggleActions: "play none none none",
          },
        });

        // Step 1: Animate sidebar images
        // Top images (all except the last one) fade in from above (-Y)
        // The last image fades in from below (+Y)
        const totalItems = sidebarItemsRef.current.length;

        sidebarItemsRef.current.forEach((item, index) => {
          if (!item) return;

          const isLastItem = index === totalItems - 1;
          const initialY = isLastItem ? 40 : -40;

          section2Timeline.from(
            item,
            {
              y: initialY,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            index * 0.15, // Stagger sequential entry
          );
        });

        // Step 2: Main image appears from the right side after sidebar images fade in
        if (mainImageRef.current) {
          section2Timeline.from(
            mainImageRef.current,
            {
              x: 80,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.2",
          );
        }
      }
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-[4%] pt-[120px] pb-16 font-sans text-slate-900 selection:bg-purple-100 lg:px-[8%]"
    >
      {/* SECTION 1: HEADER & HERO TEXT */}
      <div className="mx-auto w-full max-w-6xl space-y-3 text-center md:space-y-4 lg:space-y-5 xl:max-w-7xl">
        <div ref={textHeaderRef} className="space-y-3">
          <h3 className="Conversation mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            {t("header.subtitle")}
          </h3>

          <h1 className="mx-auto uppercase text-heading text-h1 sm:text-h1-sm md:text-h1-md lg:text-h1-lg xl:text-h1-xl 2xl:text-h1-2xl">
            {t("header.title")}
          </h1>

          <p className="mx-auto max-w-2xl text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
            {t("header.description")}
          </p>
        </div>

        {/* CTA Button Wrapper */}
        <div ref={ctaButtonRef} className="pt-2">
          <Link
            href="/contact"
            className="inline-block cursor-pointer bg-global px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:text-base rounded-global sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
          >
            {t("header.cta")}
          </Link>
        </div>
      </div>

      {/* SECTION 2: PROCESS & MAIN SHOWCASE CONTAINER */}
      <div
        ref={showcaseContainerRef}
        className="mx-auto mt-8 flex w-full max-w-7xl flex-col items-stretch justify-center gap-6 lg:mt-20 lg:grid lg:grid-cols-12 md:mt-16 xl:mt-24 2xl:mt-28"
      >
        {/* Right Area: Main Interactive 3D Showcase Image */}
        <div
          ref={mainImageRef}
          className="order-1 lg:order-2 lg:col-span-8 xl:col-span-9 w-full flex flex-col h-full min-h-[300px] lg:min-h-0"
        >
          <div className="relative w-full h-full min-h-[350px] lg:min-h-full rounded-2xl overflow-hidden bg-slate-900/5 shadow-lg border border-slate-100">
            <Image
              src={Image1}
              alt={t("images.mainShowcaseAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 75vw"
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>

        {/* Left Sidebar: Process & UI Control Cards */}
        <div className="order-2 lg:order-1 lg:col-span-4 xl:col-span-3 grid grid-cols-2 lg:flex lg:flex-col lg:justify-between items-center lg:items-stretch gap-3 w-full max-w-md mx-auto lg:max-w-none h-full">
          {SIDEBAR_STEPS.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => {
                if (el) sidebarItemsRef.current[index] = el;
              }}
              className=""
            >
              <div className="w-full relative overflow-hidden rounded-xl bg-slate-900/5 shadow-sm border border-slate-100">
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={320}
                  height={180}
                  className="w-full object-contain rounded-xl"
                  priority={step.id === "ergonomic"}
                />
              </div>

              {/* Connecting indicator between cards (Desktop only) */}
             
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
