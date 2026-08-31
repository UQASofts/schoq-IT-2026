"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import { image1, image2, image3, image4, image5, image6 } from "@/assets";
import { heroBgImage } from "@/public";
const images = [image1, image2, image3, image4, image5, image6, image2];

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TranslatedService {
  title: string;
  description: string;
}

const OneTeam: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const t = useTranslations("Home.OneTeam");
  const translatedServices = t.raw("services") as TranslatedService[];

  const services = translatedServices.map((service, index) => ({
    ...service,
    image: images[index],
  }));
  // const services = [
  //   {
  //     image: image1,
  //     title: "Custom Software",
  //     description:
  //       "Tailored enterprise software solutions and custom system development for unique business requirements.",
  //   },
  //   {
  //     image: image2,
  //     title: "AI & Machine Learning",
  //     description:
  //       "Tailored enterprise software solutions and custom system development for unique business requirements.",
  //   },
  //   {
  //     image: image3,
  //     title: "Web Development",
  //     description:
  //       "From business websites to custom web applications, delivering fast, reliable, and user-focused digital experiences.",
  //   },
  //   {
  //     image: image4,
  //     title: "Mobile Apps",
  //     description:
  //       "Tailored enterprise software solutions and custom system development for unique business requirements.",
  //   },
  //   {
  //     image: image5,
  //     title: "UI/UX Design",
  //     description:
  //       "Tailored enterprise software solutions and custom system development for unique business requirements.",
  //   },
  //   {
  //     image: image6,
  //     title: "SaaS Development",
  //     description:
  //       "Build and scale secure, multi-tenant software-as-a-service platforms globally.",
  //   },
  //   {
  //     image: image2,
  //     title: "DevOps & Cloud Infrastructure",
  //     description:
  //       "Tailored enterprise software solutions and custom system development for unique business requirements.",
  //   },
  // ];

  const firstRow = services.slice(0, 4);
  const secondRow = services.slice(4);

  useGSAP(
    () => {
      // ---- Header & Button ----
      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".header-trigger",
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
          // markers: true,
        },
      });

      headerTimeline.from(".oneTeam-header", {
        y: "30%",
        duration: 0.4,
        ease: "power4.out",
      });

      // ---- Service Cards - One-by-One from Below (view trigger only) ----
      const servicesTL = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none play reverse",
        },
      });

      // Get all service cards
      const allCards = document.querySelectorAll(".service-card");

      // Set initial state - hidden below
      gsap.set(allCards, {
        y: 80,
        opacity: 0,
        scale: 0.95,
      });

      // Animate each card one-by-one from below
      servicesTL.to(allCards, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.2,
        delay: 0.3,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: container },
  );

  return (
    <section
      // style={{ backgroundImage: `url(${heroBgImage.src})` }}
      ref={container}
      className="bg-white w-full px-[4%] md:px-[8.61%] py-16 md:py-24 lg:py-18 overflow-hidden"
    >
      <div className="header-trigger">
        {/* Header with wrapper mask */}
        <div className="mb-8 md:mb-12 text-center overflow-hidden py-1">
          <div className="reveal-text">
            <h2 className="oneTeam-header text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              {t("header.title1")}
              <br />
              {t("header.title2")}
            </h2>
          </div>
        </div>

        {/* Description and CTA */}
        <div className="grid grid-cols-1 mx-auto text-center w-11/12 md:w-2/3 lg:w-1/2 justify-items-center gap-6 md:gap-8">
          <p className="text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
            {t("header.description")}
          </p>

          {/* Button wrapped in an overflow-hidden mask */}
          <div className="overflow-hidden py-2 px-4">
            <div className="reveal-btn">
              <Link
                href="#"
                className="inline-block bg-global text-white text-base sm:text-lg font-medium px-8 py-3.5 rounded-global hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
              >
                {t("header.cta")}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-16 relative services-section space-y-4 lg:space-y-6 relative">
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div
              className="w-full h-full md:h-[50%] rotate-90 scale-[2.2] rounded-[1750px] blur-[186px] md:rotate-0 md:scale-100"
              style={{
                background:
                  "linear-gradient(90deg, rgba(87, 94, 227, 0.60) 0%, rgba(86, 213, 154, 0.60) 100%)",
              }}
            />
          </div>
        <div className="absolute h-400 sm:h-250 lg:h-100 2xl:h-90 w-full left-0 top-20 lg:top-[40%] services-section space-y-8 px-10 blur-3xl"></div>
          {/* First Row Container */}
          <div className="service-wrapper1 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 z-10">
            {firstRow.map((service, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 service-card group bg-white rounded-global p-6 border border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-lg shadow-lg z-20 sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
              >
                <div className="w-15 h-15 rounded-global bg-gray-900/5 flex items-center justify-center group-hover:bg-gray-900/10 transition-colors sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl">
                  <Image
                    alt={service.title}
                    src={service.image.src}
                    width={100}
                    height={100}
                  />
                </div>

                <h3 className="self-stretch font-inter not-italic text-heading4 text-h4 sm:text-h4-sm md:text-h4-md lg:text-h4-lg xl:text-h4-xl 2xl:text-h4-2xl">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Second Row Container */}
          <div className="w-fit service-wrapper1 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 z-10">
            {secondRow.map((service, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 service-card group bg-white rounded-global p-6 border border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-lg shadow-lg z-20 sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
              >
                <div className="w-15 h-15 rounded-global bg-gray-900/5 flex items-center justify-center mb-4 group-hover:bg-gray-900/10 transition-colors sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl">
                  <Image
                    alt={service.title}
                    src={service.image}
                    width={100}
                    height={100}
                  />
                </div>

                <h3 className="self-stretch font-inter not-italic text-heading4 text-h4 sm:text-h4-sm md:text-h4-md lg:text-h4-lg xl:text-h4-xl 2xl:text-h4-2xl">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneTeam;
