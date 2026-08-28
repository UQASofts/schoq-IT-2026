"use client";

import Image from "next/image";
import gsap from "gsap";
import ConceptAIImage from "@/public/services/ConceptAI.webp";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function ConceptAI() {
  const imageContainer = useRef<HTMLDivElement>(null);
  const containerMain = useRef<HTMLDivElement>(null);
  const t = useTranslations("AI.ConceptAI");

  useGSAP(() => {
    gsap.from(imageContainer.current, {
      yPercent: 70,
      opacity: 0,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerMain.current,
        start: "top 80%",
        // markers: true,
        toggleActions: "play none play reverse",
      },
    });
  });
  return (
    <section
      ref={containerMain}
      className="w-full h-fit pt-12 sm:pt-16 md:pt-24 pb-0 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#f0f9ff] via-[#eef2ff] to-[#ecfdf5] flex flex-col items-center justify-end font-sans overflow-hidden"
    >
      <div
        ref={imageContainer}
        className="w-full max-w-6xl mx-auto flex justify-center items-end px-10"
      >
        <Image
          src={ConceptAIImage}
          alt={t("altText")}
          priority
          className="w-full h-auto object-contain rounded-t-2xl sm:rounded-t-3xl shadow-2xl"
        />
      </div>
    </section>
  );
}
