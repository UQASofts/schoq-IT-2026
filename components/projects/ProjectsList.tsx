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
    image: "/projects/amin-hotel/project-amin-hotel.png",
    href: "https://aminhotel.com/",
    icons: [
      "/projects/room_discovery_and_details.png",
      "/projects/hotel_amenities_and_service.png",
      "/projects/onine_booking_experience.png",
      "/projects/integrated_restaurant_ordering.png",
    ],
  },
  {
    id: "myanza",
    image: "/projects/my-anza/myanza.png",
    href: "https://myanza.com",
    icons: [
      "/projects/social_feed_and_content_sharing.png",
      "/projects/profiles_and_user_interaction.png",
      "/projects/direct_and_real_time_messaging.png",
      "/projects/video_account_verification.png",
    ],
  },
  {
    id: "hilfehafen",
    image: "/projects/hilfehafen/project-hilfehafen.png",
    href: "https://hilfehafen.de/",
    icons: [
      "/projects/attendance_and_working_hours.png",
      "/projects/shift_scheduling_and_coverage.png",
      "/projects/leave_request_and_communication.png",
      "/projects/office_management_and_reporting.png",
    ],
  },
] as const;

type TranslatedProject = {
  id: string;
  category: string;
  title: string;
  visitLabel?: string;
  description: string;
  description2: string;
  features: string[];
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
      visitLabel: item?.visitLabel,
      description: item?.description ?? "",
      description2: item?.description2 ?? "",
      features: item?.features ?? [],
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
      <div ref={cardsRef} className="flex w-full max-w-[1200px] flex-col gap-10">
        {projects.map((project) => (
          <article
            key={project.id}
            className="relative w-full rounded-global p-px will-change-[transform,opacity] sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-global bg-global opacity-20 sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
            />
            <div className="relative flex w-full flex-col overflow-hidden rounded-global bg-white sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl">
              <div className="relative aspect-[16/9] w-full min-h-[240px] sm:min-h-[360px] lg:min-h-[460px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1200px) 92vw, 1200px"
                  className="object-cover object-center"
                />
              </div>

              <div className="project-card-text flex flex-col gap-5 px-5 py-6 sm:gap-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                <p className="font-inter inline-block w-fit bg-global bg-clip-text text-xs font-semibold uppercase tracking-[0.2em] text-transparent">
                  {project.category}
                </p>
                <h2
                  translate="no"
                  className="text-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl"
                >
                  {project.title}
                </h2>
                <p className="whitespace-pre-wrap text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
                  {project.description}
                </p>
                <p className="whitespace-pre-wrap text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
                  {project.description2}
                </p>

                <div className="grid grid-cols-1 gap-5 pt-2 sm:grid-cols-2 lg:grid-cols-4">
                  {project.features.map((feature, index) => {
                    const icon = project.icons[index];
                    if (!icon) return null;
                    return (
                      <div key={feature} className="flex items-center gap-3">
                        <Image
                          src={icon}
                          alt=""
                          width={48}
                          height={48}
                          className="h-12 w-12 shrink-0 object-contain"
                        />
                        <span className="text-heading text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl">
                          {feature}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-fit rounded-global bg-global p-px sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl transition-opacity hover:opacity-80"
                >
                  <span className="inline-flex items-center justify-center rounded-global bg-white px-8 py-2.5 sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl">
                    <span className="bg-global bg-clip-text font-semibold text-transparent text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl">
                      {project.visitLabel ?? t("visit")}
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
