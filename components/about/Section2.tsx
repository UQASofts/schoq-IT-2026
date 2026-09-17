"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations("About.Section2");

  useGSAP(
    () => {
      gsap.from(".Techonology-Text", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".Container-One",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".team-card", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".Container-Two",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  const profiles = [
    {
      image: "/director.png",
      role: t("team.director"),
      name: t("team.directorName"),
      bio: t("team.directorBio"),
    },
    {
      image: "/co-founder.png",
      role: t("team.director"),
      name: t("team.coFounderName"),
      bio: t("team.coFounderBio"),
    },
  ] as const;

  return (
    <section
      ref={containerRef}
      className="relative z-1 flex min-h-screen flex-col bg-linear-to-br from-[#EAF4F7] via-white to-white px-[4%] py-16 text-foreground md:px-[8.61%] md:py-24"
    >
      <div className="Container-One mx-auto w-full max-w-5xl text-center">
        <div className="Techonology-Text">
          <h2 className="uppercase text-heading leading-[1.2] md:leading-[1.1] tracking-tight text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl md:mt-6">
            {t("description")}
          </p>
          <h3 className="mt-10 uppercase text-heading leading-[1.2] tracking-tight text-h3 sm:text-h3-sm md:mt-12 md:text-h3-md lg:text-h3-lg xl:text-h3-xl 2xl:text-h3-2xl">
            {t("foundersHeading")}
          </h3>
        </div>
      </div>

      <div className="Container-Two mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 md:gap-10 lg:gap-20">
        {profiles.map((person) => (
          <div
            key={person.name}
            className="team-card flex flex-col items-center text-center"
          >
            <div className="relative mb-6 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px]">
              <Image
                src={person.image}
                alt={person.name}
                width={720}
                height={900}
                className="h-auto w-full object-contain object-bottom"
              />
            </div>
            <p className="text-sm font-extrabold tracking-widest text-heading uppercase sm:text-base">
              {person.role}
            </p>
            <p className="mt-1 bg-global bg-clip-text text-sm font-bold text-transparent uppercase sm:text-base">
              {person.name}
            </p>
            <p className="mt-3 max-w-md text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
              {person.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
