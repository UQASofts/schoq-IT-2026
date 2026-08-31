"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { setUserLocale } from "../../lib/locale";
import { Locale } from "../../i18n/config";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const onSelect = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      setUserLocale(next);
    });
  };

  const isDe = locale === "de";

  return (
    <div
      className={`inline-flex items-center rounded-global bg-white px-2.5 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] select-none ${
        isPending ? "pointer-events-none opacity-60" : "opacity-100"
      }`}
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => onSelect("de")}
        disabled={isPending}
        aria-pressed={isDe}
        className={`text-xs font-medium tracking-wide transition-colors ${
          isDe ? "text-[#1A1B21]" : "text-[#B9CACB] hover:text-[#3B494B]"
        }`}
      >
        DE
      </button>
      <span className="px-1 text-xs text-[#B9CACB]" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => onSelect("en")}
        disabled={isPending}
        aria-pressed={!isDe}
        className={`text-xs font-medium tracking-wide transition-colors ${
          !isDe ? "text-[#1A1B21]" : "text-[#B9CACB] hover:text-[#3B494B]"
        }`}
      >
        EN
      </button>
    </div>
  );
}
