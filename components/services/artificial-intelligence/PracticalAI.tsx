"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

import {
  Caution,
  DisabledCloud,
  ExamBoard,
  ProfilePicture,
  Sprinkles,
  TodoList,
} from "@/components/icons/Icons";

gsap.registerPlugin(ScrollTrigger);

export default function PracticalAI() {
  const containerMain = useRef<HTMLDivElement>(null);
  const textHeaderRef = useRef<HTMLDivElement>(null);
  const textSubref = useRef<HTMLParagraphElement>(null);

  const containerCols1 = useRef<HTMLDivElement>(null);
  const containerCols2 = useRef<HTMLDivElement>(null);

  const manualItemsRef = useRef<HTMLDivElement>(null);
  const flowItemsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("AI.Practical");
  const manualComplexityItems = t.raw("manualComplexity.items") as string[];
  const intelligentFlowItems = t.raw("intelligentFlow.items") as string[];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 0px)", () => {
        const isMobile = window.innerWidth < 768;

        const mainTL = gsap.timeline({
          scrollTrigger: {
            trigger: containerMain.current,
            start: isMobile ? "top 80%" : "top 65%",
            toggleActions: "play none none reverse",
          },
        });

        // 1. Header & Subtitle Stagger Fade
        mainTL
          .fromTo(
            textHeaderRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          )
          .fromTo(
            textSubref.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.5",
          );

        // 2. Left Card Entrance (Manual Complexity - Drab/Heavy entrance)
        mainTL.fromTo(
          containerCols1.current,
          { y: 40, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        );

        // Stagger Left List Items
        if (manualItemsRef.current) {
          mainTL.fromTo(
            manualItemsRef.current.children,
            { x: -20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.4",
          );
        }

        // 3. Right Card Entrance (Intelligent Flow - Dynamic spring entrance)
        mainTL.fromTo(
          containerCols2.current,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.6",
        );

        // Recommended Badge Pop
        if (badgeRef.current) {
          mainTL.fromTo(
            badgeRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.4",
          );
        }

        // Stagger Right List Items with quick scale-up
        if (flowItemsRef.current) {
          mainTL.fromTo(
            flowItemsRef.current.children,
            { x: 20, opacity: 0, scale: 0.96 },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.4",
          );
        }
      });
    },
    { scope: containerMain },
  );

  return (
    <section
      ref={containerMain}
      className="w-full bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans overflow-hidden"
    >
      <div className="max-w-5xl w-full mx-auto space-y-12 md:space-y-16">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2
            ref={textHeaderRef}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.08] text-slate-900 uppercase"
          >
            {t("title")}
          </h2>
          <p
            ref={textSubref}
            className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal"
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch max-w-4xl mx-auto">
          {/* Left Column: Manual Complexity */}
          <div
            ref={containerCols1}
            className="relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/40 flex flex-col space-y-6"
          >
            {/* Column Header */}
            <div className="flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                {t("manualComplexity.header")}
              </p>
            </div>

            {/* List Items */}
            <div
              ref={manualItemsRef}
              className="space-y-3 flex-1 flex flex-col justify-center"
            >
              <div className="bg-[#fcf3f3] hover:bg-[#fae8e8] transition-colors rounded-xl p-4 flex items-center space-x-3 text-slate-700 font-semibold text-xs sm:text-sm">
                <div className="w-5 h-5 flex items-center justify-center text-red-500 shrink-0">
                  <DisabledCloud />
                </div>

                <span>{manualComplexityItems[0]}</span>
              </div>

              <div className="bg-[#fcf3f3] hover:bg-[#fae8e8] transition-colors rounded-xl p-4 flex items-center space-x-3 text-slate-700 font-semibold text-xs sm:text-sm">
                <div className="w-5 h-5 flex items-center justify-center text-red-500 shrink-0">
                  <ExamBoard />
                </div>
                <span>{manualComplexityItems[1]}</span>
              </div>

              <div className="bg-[#fcf3f3] hover:bg-[#fae8e8] transition-colors rounded-xl p-4 flex items-center space-x-3 text-slate-700 font-semibold text-xs sm:text-sm">
                <div className="w-5 h-5 flex items-center justify-center text-red-500 shrink-0">
                  <Caution />
                </div>
                <span>{manualComplexityItems[2]}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Intelligent Flow (Recommended) */}
          <div
            ref={containerCols2}
            className="relative bg-[#f8fafc] rounded-2xl p-6 sm:p-8 border border-indigo-200/80 shadow-xl shadow-indigo-100/50 flex flex-col space-y-6 overflow-hidden"
          >
            {/* Recommended Badge */}
            <div
              ref={badgeRef}
              className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-emerald-400 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase px-4 py-2 sm:py-2.5 rounded-bl-xl shadow-sm origin-top-right"
            >
              {t("intelligentFlow.badge")}
            </div>

            {/* Column Header */}
            <div className="flex items-center space-x-2.5 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                {t("intelligentFlow.header")}
              </p>
            </div>

            {/* List Items */}
            <div
              ref={flowItemsRef}
              className="space-y-3 flex-1 flex flex-col justify-center"
            >
              <div className="bg-[#edf2fe] hover:bg-[#e2ebfe] transition-all hover:scale-[1.01] rounded-xl p-4 flex items-center space-x-3 text-slate-800 font-semibold text-xs sm:text-sm shadow-xs">
                <div className="w-5 h-5 flex items-center justify-center text-indigo-600 shrink-0">
                  <Sprinkles />
                </div>
                <span>{intelligentFlowItems[0]}</span>
              </div>

              <div className="bg-[#edf2fe] hover:bg-[#e2ebfe] transition-all hover:scale-[1.01] rounded-xl p-4 flex items-center space-x-3 text-slate-800 font-semibold text-xs sm:text-sm shadow-xs">
                <div className="w-5 h-5 flex items-center justify-center text-indigo-600 shrink-0">
                  <TodoList />
                </div>
                <span>{intelligentFlowItems[1]}</span>
              </div>

              <div className="bg-[#edf2fe] hover:bg-[#e2ebfe] transition-all hover:scale-[1.01] rounded-xl p-4 flex items-center space-x-3 text-slate-800 font-semibold text-xs sm:text-sm shadow-xs">
                <div className="w-5 h-5 flex items-center justify-center text-indigo-600 shrink-0">
                  <ProfilePicture />
                </div>
                <span>{intelligentFlowItems[2]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
