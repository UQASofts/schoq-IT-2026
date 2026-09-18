"use client";

import React, { useRef } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import { image1, image2, image3, image4, image5, image6 } from "@/assets";
import { heroBgImage } from "@/public";
const images = [image1, image2, image3, image4, image5, image6, image2];

gsap.registerPlugin(ScrollTrigger);

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

      const servicesTL = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 80%",
          once: true,
          toggleActions: "play none none none",
        },
      });

      gsap.set(".service-card", {
        y: 48,
        opacity: 0,
      });

      servicesTL.to(".service-card", {
        y: 0,
        opacity: 1,
        duration: 0.45,
        delay: 0.15,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  return (
    <section
      // style={{ backgroundImage: `url(${heroBgImage.src})` }}
      ref={container}
      className="bg-white w-full px-[4%] md:px-[8.61%] py-16 md:py-24 lg:py-18 overflow-x-clip"
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
                href="/contact"
                className="inline-block bg-global text-white text-base sm:text-lg font-medium px-8 py-3.5 rounded-global hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
              >
                {t("header.cta")}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-16 relative isolate services-section space-y-4 lg:space-y-6">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div
              className="absolute left-1/2 top-1/2 h-[80%] md:h-[55%] w-[40%] md:w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[250px]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(87, 94, 227, 0.45) 0%, rgba(86, 213, 154, 0.45) 100%)",
              }}
            />
          </div>
          {/* First Row Container */}
          <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {firstRow.map((service, index) => (
              <div
                key={index}
                className="service-card group relative z-10 isolate flex flex-col gap-2 rounded-global bg-white p-6 border border-gray-100 shadow-lg [transform:translateZ(0)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] hover:border-gray-300 hover:shadow-lg transition-colors duration-300 sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
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
          <div className="relative z-10 w-fit grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {secondRow.map((service, index) => (
              <div
                key={index}
                className="service-card group relative z-10 isolate flex flex-col gap-2 rounded-global bg-white p-6 border border-gray-100 shadow-lg [transform:translateZ(0)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] hover:border-gray-300 hover:shadow-lg transition-colors duration-300 sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
              >
                <div className="w-15 h-15 rounded-global bg-gray-900/5 flex items-center justify-center mb-4 group-hover:bg-gray-900/10 transition-colors sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl">
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
        </div>
      </div>
    </section>
  );
};

export default OneTeam;
