"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "amin-hotel",
    image: "/projects/project-amin-hotel.png",
    href: "https://aminhotel.com/",
  },
  {
    id: "myanza",
    image: "/projects/project-myanza.png",
    href: "https://myanza.com",
  },
  {
    id: "hilfehafen",
    image: "/projects/project-hilfehafen.png",
    href: "https://hilfehafen.de/",
  },
] as const;

type TranslatedProject = {
  id: string;
  category: string;
  title: string;
  description: string;
};

export default function ProjectsList() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Projects.List");
  const copy = t.raw("items") as TranslatedProject[];

  const projects = PROJECTS.map((project) => {
    const item = copy.find((entry) => entry.id === project.id);
    return {
      ...project,
      category: item?.category ?? "",
      title: item?.title ?? project.id,
      description: item?.description ?? "",
    };
  });

  useGSAP(
    () => {
      const cards = cardsRef.current?.children;
      if (!cards || cards.length === 0) return;

      Array.from(cards).forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );

        const textItems = card.querySelectorAll(".project-card-text > *");
        if (textItems.length === 0) return;

        gsap.fromTo(
          textItems,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex w-full justify-center bg-white px-[4%] py-global sm:py-global-sm md:py-global-md lg:px-[8%] lg:py-global-lg xl:py-global-xl 2xl:py-global-2xl"
    >
      <div ref={cardsRef} className="flex w-full max-w-[1200px] flex-col gap-8">
        {projects.map((project) => (
          <article
            key={project.id}
            className="relative w-full rounded-global p-px will-change-[transform,opacity] sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-global bg-global opacity-20 sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
            />
            <div className="relative flex w-full flex-col overflow-hidden rounded-global bg-white sm:rounded-global-sm md:rounded-global-md lg:h-[402px] lg:flex-row lg:items-center lg:gap-8 lg:rounded-global-lg lg:pr-8 xl:rounded-global-xl 2xl:rounded-global-2xl">
              <div className="relative h-56 w-full shrink-0 sm:h-72 lg:h-full lg:w-[55%]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 92vw, 660px"
                  className="object-cover object-center"
                />
              </div>

              <div className="project-card-text flex flex-1 flex-col justify-center gap-3 px-5 py-6 sm:px-6 lg:px-0 lg:py-0">
                <p className="font-inter inline-block w-fit bg-global bg-clip-text text-xs font-semibold uppercase tracking-[0.2em] text-transparent">
                  {project.category}
                </p>
                <h2
                  translate="no"
                  className="text-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl"
                >
                  {project.title}
                </h2>
                <p className="text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
                  {project.description}
                </p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-fit rounded-global bg-global p-px sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl transition-opacity hover:opacity-80"
                >
                  <span className="inline-flex items-center justify-center rounded-global bg-white px-6 py-2 sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl">
                    <span className="bg-global bg-clip-text font-semibold text-transparent text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl">
                      {t("visit")}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
