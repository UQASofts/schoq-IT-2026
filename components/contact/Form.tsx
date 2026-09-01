"use client";

import { useRef } from "react";
import { Geist } from "next/font/google";
import { Share2, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useTranslations } from "next-intl";

const geist = Geist({
  subsets: ["latin"],
  weight: "500",
});

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
      className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-white py-6 text-neutral-900 md:py-18"
    >
      <div className="px-[4%] md:px-[8.61%] lg:px-[10.61%] w-full grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16 items-start">
        {/* LEFT COLUMN: Text & Contact Information */}
        <div className="Container-One lg:col-span-6 flex flex-col justify-between h-full pt-4">
          <div>
            {/* Small uppercase label */}
            <p className="Conversation mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-800 sm:text-sm">
              {t("conversationLabel")}
            </p>

            {/* Bold main title */}
            <h1 className="Tell-Us mb-6 uppercase text-heading text-h1 sm:text-h1-sm md:text-h1-md lg:text-h1-lg xl:text-h1-xl 2xl:text-h1-2xl">
              {t("mainTitle1")}
              <br />
              {t("mainTitle2")}
              <br />
              {t("mainTitle3")}
            </h1>

            {/* Subtitle paragraph */}
            <p className="Share-Idea mb-12 max-w-lg text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
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
                <h3 className="font-inter not-italic text-contact text-p-contact sm:text-p-contact-sm md:text-p-contact-md lg:text-p-contact-lg xl:text-p-contact-xl 2xl:text-p-contact-2xl">
                  +49 176 22569816
                </h3>
              </div>

              {/* Email Address */}
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-2">
                  {t("contactInfo.emailLabel")}
                </p>
                <h3 className="font-inter not-italic text-contact text-p-contact sm:text-p-contact-sm md:text-p-contact-md lg:text-p-contact-lg xl:text-p-contact-xl 2xl:text-p-contact-2xl">
                  info@schoq.com
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
        <div className="Container-Two lg:col-span-6 rounded-global bg-global-soft p-6 shadow-sm sm:rounded-global-sm sm:p-10 md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl">
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
                {t("form.languageLabel")}
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
                className="flex w-full cursor-pointer items-center justify-center gap-2 bg-global px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-95 rounded-global sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
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
