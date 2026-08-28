"use client";

import { useRef } from "react";
import { Share2, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useTranslations } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Form() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations("Contact.Form");

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%", // 30% viewport from bottom
          toggleActions: "play none none reverse",
        },
      });

      // Explicitly keep inputs at opacity 1
      gsap.set(
        ".Container-Two input, .Container-Two select, .Container-Two textarea",
        { opacity: 1 },
      );

      // --- 1ST ANIMATION: Container-One (Left Column Fade & Slide) ---
      tl.from(".Conversation", {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      })
        .from(
          ".Tell-Us",
          {
            x: -60,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.9",
        )
        .from(
          ".Share-Idea",
          {
            x: -60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".Contact-Info",
          {
            x: -60,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.8",
        );

      // --- 2ND ANIMATION: Container-Two (Starts simultaneously with Container-One) ---
      // Adding `0` at the end forces this animation to initiate at timestamp 0 of the timeline
      tl.fromTo(
        ".Container-Two",
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 2,
          ease: "power4.inOut",
        },
        0, // <--- THIS POSITION PARAMETER STARTS BOTH CONTAINERS TOGETHER
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full bg-white text-neutral-900 px-6 py-12 md:px-30 md:py-24 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16 items-start">
        {/* LEFT COLUMN: Text & Contact Information */}
        <div className="Container-One lg:col-span-6 flex flex-col justify-between h-full pt-4">
          <div>
            {/* Small uppercase label */}
            <p className="Conversation text-xs font-semibold tracking-[0.25em] uppercase text-neutral-500 mb-4">
              {t("conversationLabel")}
            </p>

            {/* Bold main title */}
            <h1 className="Tell-Us text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-[0.95] tracking-tight text-neutral-950 mb-6">
              {t("mainTitle1")}
              <br />
              {t("mainTitle2")}
              <br />
              {t("mainTitle3")}
            </h1>

            {/* Subtitle paragraph */}
            <p className="Share-Idea text-neutral-500 text-sm md:text-base leading-relaxed max-w-lg mb-12">
              {t("subtitle")}
            </p>
          </div>

          {/* Contact Details & Buttons */}
          <div className="Contact-Info mb-30">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Direct Line */}
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-2">
                  {t("contactInfo.directLineLabel")}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
                  +49 (0) 30 820
                  <br />
                  910
                </h3>
              </div>

              {/* Email Address */}
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-2">
                  {t("contactInfo.emailLabel")}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  hello@schoq.eng
                </h3>
              </div>
            </div>

            {/* Share and LinkedIn Action Buttons */}
            <div className="flex items-center gap-3 pt-5">
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-neutral-200 text-xs font-semibold tracking-wider uppercase text-neutral-800 hover:bg-neutral-50 transition-colors"
              >
                LINKEDIN
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Soft Gradient Contact Form Card */}
        <div className="Container-Two lg:col-span-6 bg-linear-to-br from-teal-50/60 via-sky-100/40 to-emerald-50/50 p-6 sm:p-10 rounded-2xl border border-teal-100/50 shadow-sm">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-neutral-700 mb-2">
                {t("form.nameLabel")}
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all"
              />
            </div>

            {/* Company Input */}
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-neutral-700 mb-2">
                {t("form.companyLabel")}
              </label>
              <input
                type="text"
                placeholder="AZ Tech"
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-neutral-700 mb-2">
                {t("form.phoneLabel")}
              </label>
              <input
                type="tel"
                placeholder={t("form.phonePlaceholder")}
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all"
              />
            </div>

            {/* Preferred Language Select */}
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-neutral-700 mb-2">
                placeholder={t("form.languageLabel")}
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-neutral-500 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all cursor-pointer">
                  <option value="en">{t("form.languageOptions.enDe")}</option>
                  <option value="de">{t("form.languageOptions.de")}</option>
                  <option value="en-only">
                    {t("form.languageOptions.en")}
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-800">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Project Description Textarea */}
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-neutral-700 mb-2">
                BRIEFLY DESCRIBE YOUR PROJECT
                {t("form.projectDescriptionLabel")}
              </label>
              <textarea
                rows={4}
                placeholder={t("form.projectDescriptionPlaceholder")}
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all resize-none"
              />
            </div>

            {/* Gradient Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg bg-linear-to-r from-indigo-600 via-blue-500 to-emerald-400 hover:opacity-95 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                {t("form.submitButton")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
