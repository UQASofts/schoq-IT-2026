"use client";

import { useRef, useTransition } from "react";
import { useLocale } from "next-intl";
import { setUserLocale } from "../../lib/locale";
import { Locale } from "../../i18n/config";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Inline vector flags for zero extra bundle dependencies
function GermanFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path fill="#FFCE00" d="M0 320h640v160H0z" />
      <path fill="#000" d="M0 0h640v160H0z" />
      <path fill="#DD0000" d="M0 160h640v160H0z" />
    </svg>
  );
}

function UKFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path
        fill="#FFF"
        d="m75 0 245 180L565 0h75v55L400 240l240 185v55h-75L320 300 75 480H0v-55l240-185L0 55V0h75z"
      />
      <path
        fill="#C8102E"
        d="m424 288 216 162v30h-40L370 318l54-30zM570 0l-220 165 40 30L640 30V0h-70zM0 30l210 157-40 30L0 60v-30zm30 450 220-165-40-30L0 450v30h30z"
      />
      <path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z" />
      <path fill="#C8102E" d="M267 0h106v480H267zM0 187h640v106H0z" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const onSelect = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      setUserLocale(next);
      // window.location.reload();
    });
  };

  const isDe = locale === "de";

  // GSAP Smooth Sliding Animation
  useGSAP(
    () => {
      if (!pillRef.current) return;

      gsap.to(pillRef.current, {
        xPercent: isDe ? 0 : 100,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    { dependencies: [isDe], scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={`inline-flex relative items-center p-1 bg-white dark:bg-neutral-800/80 rounded-lg border border-[#FFFFFF0D] shadow-inner select-none transition-opacity duration-200 ${
        isPending ? "opacity-60 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Language selector"
    >
      {/* GSAP Animated Sliding Pill Indicator */}
      <div
        ref={pillRef}
        // className="absolute top-1 bottom-1 left-1 w-[50%] bg-white dark:bg-neutral-700 rounded-lg shadow-sm border border-black/5 dark:border-white/5 pointer-events-none"
      />

      {/* German Button */}
      <button
        type="button"
        onClick={() => onSelect("de")}
        disabled={isPending}
        aria-pressed={isDe}
        className={`relative z-10 flex items-center gap-1 p-1 text-xs font-semibold tracking-wide rounded-sm transition-colors duration-200 focus:outline-none ${
          isDe
          ? "text-gray-900 dark:text-white bg-linear-to-r from-[#4A4CE6]/30 via-[#34A1B4]/30 to-[#4BE191]/30"
            : "text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
        }`}
      >
        <GermanFlag className="w-4 h-3 rounded-[2px] object-cover shadow-sm shrink-0" />
        <span className="text-xs xl:text-sm">DE</span>
      </button>

      {/* English Button */}
      <button
        type="button"
        onClick={() => onSelect("en")}
        disabled={isPending}
        aria-pressed={!isDe}
        className={`relative z-10 flex items-center gap-1 p-1 text-xs font-semibold tracking-wide rounded-sm transition-colors duration-200 focus:outline-none ${
          !isDe
          ? "text-gray-900 dark:text-white bg-linear-to-r from-[#4A4CE6]/30 via-[#34A1B4]/30 to-[#4BE191]/30"
            : "text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
        }`}
      >
        <UKFlag className="w-4 h-3 rounded-[2px] object-cover shadow-sm shrink-0" />
        <span className="text-xs xl:text-sm">EN</span>
      </button>
    </div>
  );
}
