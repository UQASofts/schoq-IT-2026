"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const TAB_IDS = ["all", "web", "mobile", "custom"] as const;
type TabId = (typeof TAB_IDS)[number];

export default function ProjectsTabs() {
  const t = useTranslations("Projects.Tabs");
  const [active, setActive] = useState<TabId>("all");

  return (
    <nav aria-label={t("ariaLabel")} className="w-full bg-white">
      <div className="h-px w-full bg-global opacity-20" />
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-4 px-4 py-6 sm:gap-6 sm:py-8 lg:gap-8 lg:px-0 lg:py-8">
        {TAB_IDS.map((id) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              aria-pressed={isActive}
              className={`font-inter cursor-pointer whitespace-nowrap text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl transition-colors ${
                isActive
                  ? "font-semibold text-heading"
                  : "font-medium text-neutral-400 hover:text-neutral-600"
              }`}
            >
              {t(id)}
            </button>
          );
        })}
      </div>
      <div className="h-px w-full bg-global opacity-20" />
    </nav>
  );
}
