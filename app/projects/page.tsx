"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ServicesPage() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Minimal GSAP entrance animation
  useGSAP(
    () => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 pb-12 pt-35"
    >
      <h1
        ref={titleRef}
        className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tight text-center select-none"
      >
        Projects
      </h1>
    </main>
  );
}
