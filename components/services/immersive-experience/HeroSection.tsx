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
      className="min-h-screen bg-white text-slate-900 flex flex-col items-center px-4 sm:px-6 lg:px-8 justify-start pt-16 pb-16 md:pt-20 md:pb-24 font-sans selection:bg-purple-100 overflow-hidden"
    >
      {/* SECTION 1: HEADER & HERO TEXT */}
      <div className="max-w-4xl mx-auto text-center space-y-6 mb-12 md:mb-16">
        <div ref={textHeaderRef} className="space-y-4">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-slate-800">
            {t("header.subtitle")}
          </h3>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-slate-900 uppercase max-w-5xl mx-auto">
            {t("header.title")}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            {t("header.description")}
          </p>
        </div>

        {/* CTA Button Wrapper */}
        <div ref={ctaButtonRef} className="pt-2">
          <Link
            href="#"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-white rounded-lg bg-gradient-to-r from-[#635BFF] via-[#3B82F6] to-[#10B981] shadow-md hover:shadow-lg hover:opacity-95 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {t("header.cta")}
          </Link>
        </div>
      </div>

      {/* SECTION 2: PROCESS & MAIN SHOWCASE CONTAINER */}
      <div
        ref={showcaseContainerRef}
        className="w-full max-w-5xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-6 items-stretch justify-center"
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
              className="w-full flex flex-col items-center"
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
              {step.showConnector && (
                <div className="hidden lg:flex py-1 justify-center items-center">
                  <span className="text-slate-300 text-xs font-light">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
