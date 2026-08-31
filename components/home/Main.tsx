"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Geist } from "next/font/google";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { heroBgImage } from "@/public";
import { useTranslations } from "next-intl";

const geist = Geist({
  subsets: ["latin"],
  weight: "700",
});

const REVEAL_DURATION = 2;
const REVEAL_DELAY = 1;
const REVEAL_EASE = "power3.inOut";

const Main: React.FC = () => {
  const container = useRef<HTMLElement>(null);
  const t = useTranslations("Home.Main");
  const TAGS = t.raw("tags") as string[];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
        () => {
          const tl = gsap.timeline({
            defaults: { duration: REVEAL_DURATION, ease: REVEAL_EASE },
            delay: REVEAL_DELAY,
          });

          tl.fromTo(
            ".main-container",
            { clipPath: "inset(0% 99% 0% 0%)", x: "50%" },
            { clipPath: "inset(0% 0% 0% 0%)", x: "0%" },
            0,
          );

          tl.fromTo(
            ".main-tags",
            { xPercent: -20, x: "-100%", opacity: 1 },
            { xPercent: 0, x: 0, opacity: 1 },
            0,
          );

          tl.to(
            ".tag-rest",
            { opacity: 0, width: 0, delay: 0.1, stagger: 0.06 },
            0,
          );

          const firstLetters = () =>
            gsap.utils.toArray<HTMLElement>(".tag-first", container.current);

          tl.add(() => {
            firstLetters().forEach((el) => {
              el.classList.add("bg-global", "bg-clip-text", "text-transparent");
            });
          });

          return () => {
            firstLetters().forEach((el) => {
              el.classList.remove(
                "bg-global",
                "bg-clip-text",
                "text-transparent",
              );
            });
            tl.kill();
          };
        },
      );

      mm.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 1023px)",
        () => {
          const tl = gsap.timeline({
            defaults: { duration: 1.2, ease: "power3.out" },
            delay: 0.5,
          });

          tl.fromTo(
            ".m-main-container",
            {
              opacity: 0,
              y: 40,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
            },
            0,
          );

          const tags = document.querySelectorAll(".m-tags");
          tl.fromTo(
            tags,
            {
              opacity: 0,
              y: 20,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.08,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.3",
          );

          return () => tl.kill();
        },
      );

      return () => mm.revert();
    },
    { scope: container },
  );

  const scrollToNext = () => {
    const next = container.current?.nextElementSibling;
    if (next instanceof HTMLElement) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={container}
      style={{ backgroundImage: `url(${heroBgImage.src})` }}
      className="relative flex h-screen w-full flex-col bg-cover bg-center bg-no-repeat"
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-5 pt-[120px]">
        <div className="flex w-full items-center justify-center">
          <div className="flex w-fit max-w-full items-center gap-[8px] lg:flex-row">
          <div className="main-container m-main-container w-full min-w-0 bg-global rounded-global-sm md:rounded-global-md lg:w-[58vw] lg:rounded-global-lg xl:w-[60vw] xl:rounded-global-xl xl:p-10 2xl:rounded-global-2xl p-5 sm:p-6 md:p-8 lg:px-6 2xl:p-12">
            <h1 className="text-center text-white uppercase text-h1 sm:text-h1-sm md:text-h1-md lg:text-left lg:text-h1-lg xl:text-h1-xl 2xl:text-h1-2xl">
              {t("titleOne")}
              <br />
              {t("titleTwo")}
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-center text-white text-p sm:mt-4 sm:text-p-sm md:text-p-md lg:mx-0 lg:text-left lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
              {t("description")}
            </p>

            <div className="mt-5 flex justify-center sm:mt-6 lg:mt-4 lg:justify-start xl:mt-6 2xl:mt-8">
              <Link
                href="/contact"
                className="inline-flex h-11 w-full max-w-sm items-center justify-center px-5 text-sm font-medium whitespace-nowrap text-white rounded-global border border-white/25 bg-transparent shadow-[0_4px_16px_0_rgba(0,0,0,0.12)] transition-colors hover:bg-white/10 sm:h-12 sm:w-auto sm:px-6 sm:text-base sm:rounded-global-sm md:rounded-global-md lg:h-12 lg:rounded-global-lg lg:px-6 lg:text-sm xl:rounded-global-xl xl:text-base 2xl:h-14 2xl:rounded-global-2xl 2xl:px-8 2xl:text-lg"
              >
                {t("buttonDiscuss")}
              </Link>
            </div>
          </div>

          <div className="main-tags m-main-tags relative z-10 hidden h-auto shrink-0 flex-col justify-evenly gap-3 overflow-visible lg:flex xl:gap-4 2xl:gap-6">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className={`${geist.className} tags inline-block w-fit whitespace-nowrap text-[40px] font-bold not-italic leading-[120%] tracking-[-3px] text-[#696B78]`}
              >
                <span className="tag-first inline-block">{tag.charAt(0)}</span>
                <span className="tag-rest inline-block overflow-hidden align-bottom whitespace-nowrap text-bg-global">
                  {tag.slice(1)}
                </span>
              </span>
            ))}
          </div>
          </div>
        </div>

        <div className="mt-4 flex w-full flex-wrap justify-center gap-2 sm:mt-5 sm:gap-3 lg:hidden">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="m-tags rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-700 sm:px-4 sm:py-2 sm:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-1">
        <button
          type="button"
          onClick={scrollToNext}
          className="flex flex-col items-center gap-1 text-[10px] font-medium tracking-widest text-gray-400 uppercase animate-bounce sm:text-xs lg:text-[10px] xl:text-xs 2xl:text-sm"
          aria-label={t("scroll")}
        >
          <span>{t("scroll")}</span>
          <ChevronDown className="h-4 w-4 lg:h-3 lg:w-3 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5" />
        </button>
      </div>
    </section>
  );
};

export default Main;
