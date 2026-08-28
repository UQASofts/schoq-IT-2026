"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Idea1 from "@/public/Idea1.webp";
import Idea2 from "@/public/Idea2.webp";
import Idea3 from "@/public/Idea3.webp";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  titleKey: "myAnza" | "workforceManagement";
  image: typeof Idea1;
}

/* =========================================================
   CARD POSITION
   =========================================================

   LEFT      = small
   MIDDLE    = medium
   RIGHT     = large

   All cards have the SAME Y position.

   LEFT
        MIDDLE
                RIGHT

   Only X + SCALE changes.
========================================================= */

const getCardState = (
  index: number,
  activeIndex: number,
  total: number
) => {
  let position = index - activeIndex;

  // Keep the 3 cards in circular order
  if (position < -2) {
    position += total;
  }

  if (position > 0) {
    position -= total;
  }

  // LEFT — smallest
  if (position === -2) {
    return {
      xPercent: -80,
      y: 0,
      scale: 0.42,
      opacity: 1,
      zIndex: 10,
    };
  }

  // MIDDLE — medium
  if (position === -1) {
    return {
      xPercent: -60,
      y: 0,
      scale: 0.66,
      opacity: 1,
      zIndex: 20,
    };
  }

  // RIGHT — biggest / active
  if (position === 0) {
    return {
      xPercent: -30,
      y: 0,
      scale: 1,
      opacity: 1,
      zIndex: 30,
    };
  }

  // Hidden card
  return {
    xPercent: 100,
    y: 0,
    scale: 0.42,
    opacity: 0,
    zIndex: 0,
  };
};

const Ideas: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(2);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const container = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isFirstRender = useRef(true);

  const t = useTranslations("Home.Ideas");

  /* =========================================================
     PROJECTS
  ========================================================= */

  const projects: Project[] = [
    {
      id: 1,
      titleKey: "myAnza",
      image: Idea2,
    },
    {
      id: 2,
      titleKey: "workforceManagement",
      image: Idea1,
    },
    {
      id: 3,
      titleKey: "myAnza",
      image: Idea3,
    },
  ];

  const totalSlides = projects.length;

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + totalSlides) % totalSlides
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  /* =========================================================
     MOUSE DRAG
  ========================================================= */

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;

    const diff = e.clientX - startX;

    // Swipe threshold
    if (Math.abs(diff) > 70) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }

      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  /* =========================================================
     TOUCH SWIPE
  ========================================================= */

  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;

    const diff =
      e.touches[0].clientX - startX;

    // Swipe threshold
    if (Math.abs(diff) > 60) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }

      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  /* =========================================================
     HEADER ANIMATION
  ========================================================= */

  useGSAP(
    () => {
      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
          end: "bottom 60%",
          toggleActions:
            "play reverse play reverse",
        },
      });

      headerTimeline.from(".header-two", {
        y: "100%",
        duration: 1.1,
        ease: "power4.out",
      });
    },
    {
      scope: container,
    }
  );

  /* =========================================================
     CARD ENTRANCE ANIMATION
     Original animation preserved
  ========================================================= */

  useGSAP(
    () => {
      projects.forEach((_, index) => {
        const el = cardRefs.current[index];

        if (!el) return;

        const state = getCardState(
          index,
          currentIndex,
          totalSlides
        );

        gsap.set(el, {
          xPercent: state.xPercent,
          y: 0,
          scale: state.scale,
          zIndex: state.zIndex,
          opacity: 0,
        });
      });

      const entranceConfigs = [
        {
          x: 250,
          y: 0,
          rotation: 8,
        },
        {
          x: 0,
          y: 180,
          rotation: -5,
        },
        {
          x: 0,
          y: 180,
          rotation: -5,
        },
      ];

      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".start-btn",
          start: "top 85%",
          toggleActions:
            "play none play reverse",
        },

        defaults: {
          duration: 0.9,
          ease: "power3.out",
        },
      });

      entranceConfigs.forEach(
        (config, index) => {
          const el = cardRefs.current[index];

          if (!el) return;

          const state = getCardState(
            index,
            currentIndex,
            totalSlides
          );

          cardsTl.fromTo(
            el,
            {
              x: config.x,
              y: config.y,
              opacity: 0,
              scale: 1,
              rotation: config.rotation,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              scale: state.scale,
              xPercent: state.xPercent,
              duration: 0.9,
              ease: "power3.out",
            },
            index === 0 ? 0 : "-=0.7"
          );
        }
      );
    },
    {
      scope: container,
      dependencies: [],
    }
  );

  /* =========================================================
     SLIDE ANIMATION

     IMPORTANT:
     Y = 0 ALWAYS

     Only X + SCALE changes.
  ========================================================= */

  useGSAP(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      projects.forEach((_, index) => {
        const el = cardRefs.current[index];

        if (!el) return;

        const state = getCardState(
          index,
          currentIndex,
          totalSlides
        );

        gsap.set(el, {
          zIndex: state.zIndex,
        });

        gsap.to(el, {
          xPercent: state.xPercent,

          // SAME Y POSITION
          y: 0,

          // SMALL → MEDIUM → LARGE
          scale: state.scale,

          opacity: state.opacity,

          rotation: 0,

          duration: 0.7,

          ease: "power2.out",

          overwrite: "auto",
        });
      });
    },
    {
      dependencies: [currentIndex],
      scope: container,
    }
  );

  return (
    <section
      ref={container}
      className="
        relative
        w-full
        overflow-hidden
        bg-white

        py-12
        sm:py-16
        md:py-20
        lg:py-20
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_center_top,#ffffff_0%,#ffffff_38%,#eef3ff_72%,#eafaf8_100%)]
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="relative z-10 w-full px-4">
        <div className="header-one mb-2">
          <h2
            className="
              text-center
              font-bold
              tracking-tight
              text-gray-900
              leading-[1.02]

              text-[40px]
              sm:text-[46px]
              md:text-[54px]
              lg:text-[64px]
              xl:text-[68px]
            "
          >
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h2>
        </div>

        {/* =================================================
            DESCRIPTION + BUTTON
        ================================================= */}

        <div
          className="
            header-two
            mb-8
            grid
            grid-cols-1
            place-items-center
            gap-4

            sm:mb-10
            sm:gap-5

            md:mb-12
          "
        >
          <p
            className="
              w-[92%]
              max-w-[620px]
              text-center
              text-gray-600
              leading-relaxed

              text-[14px]
              sm:text-[15px]
              md:text-[16px]
              lg:text-[17px]
            "
          >
            {t("description")}
          </p>

          <div className="flex items-center justify-center">
            <Link
              href="#"
              className="
                start-btn
                inline-block
                rounded-[4px]
                bg-gradient-to-r
                from-[#4A4CE6]
                via-[#34A1B4]
                to-[#4BE191]
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-xl

                sm:px-6
                sm:py-3
              "
            >
              {t("buttonStartProject")}
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          CAROUSEL
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          w-full
          items-center
          justify-center

          h-[260px]
          sm:h-[300px]
          md:h-[360px]
          lg:h-[430px]
          xl:h-[470px]
        "
      >
        {/* TOP GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-0
            h-[55%]
            w-full
            bg-gradient-to-r
            from-[#4A4CE6]/15
            via-white
            to-[#4A4CE6]/15
            blur-3xl
          "
        />

        {/* BOTTOM GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            z-0
            h-[55%]
            w-full
            bg-gradient-to-r
            from-[#4BE191]/15
            via-white
            to-[#4BE191]/15
            blur-3xl
          "
        />

        {/* =================================================
            TOUCH / DRAG AREA
        ================================================= */}

        <div
          ref={carouselRef}
          className={`
            relative
            z-10
            h-full
            w-full
            select-none
            overflow-visible

            touch-pan-y

            ${isDragging
              ? "cursor-grabbing"
              : "cursor-grab"
            }
          `}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* =================================================
              CARDS
          ================================================= */}

          {projects.map(
            (project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2

                  -translate-x-1/2
                  -translate-y-1/2

                  w-[78vw]
                  max-w-[560px]

                  sm:w-[70vw]

                  md:w-[58vw]

                  lg:w-[45vw]

                  xl:w-[44vw]

                  2xl:w-[560px]

                  aspect-[16/9]

                  origin-center

                  pointer-events-none
                "
              >
                {/* =================================================
                    IMAGE CONTAINER

                    No white space.
                    Image fills entire container.
                ================================================= */}

                <div
                  className="
                    relative
                    h-full
                    w-full
                    overflow-hidden

                    rounded-[6px]

                    bg-transparent

                    shadow-[0_12px_35px_rgba(20,30,60,0.14)]
                  "
                >
                  <Image
                    src={project.image}
                    alt={project.titleKey}
                    fill
                    priority={index === 2}
                    draggable={false}
                    sizes="
                      (max-width: 640px) 78vw,
                      (max-width: 768px) 70vw,
                      (max-width: 1024px) 58vw,
                      (max-width: 1280px) 45vw,
                      560px
                    "
                    className="
                      absolute
                      inset-0

                      h-full
                      w-full

                      object-cover
                      object-center

                      pointer-events-none
                    "
                  />
                </div>
              </div>
            )
          )}
        </div>

        {/* =====================================================
            LEFT ARROW
        ===================================================== */}

        <button
          type="button"
          onClick={prevSlide}
          aria-label={t("aria.previousSlide")}
          className="
            absolute
            left-2
            top-1/2
            z-[100]

            flex
            -translate-y-1/2
            items-center
            justify-center

            rounded-full

            border
            border-gray-200

            bg-white/95

            shadow-lg

            backdrop-blur-sm

            transition-all
            duration-300

            hover:scale-110
            hover:bg-white

            active:scale-95

            w-9
            h-9

            sm:left-4
            sm:w-10
            sm:h-10

            md:left-6
            md:w-11
            md:h-11

            lg:left-8
            lg:w-12
            lg:h-12

            xl:left-10
          "
        >
          <ChevronLeft
            className="
              h-4
              w-4

              sm:h-5
              sm:w-5

              md:h-6
              md:w-6

              text-gray-800
            "
          />
        </button>

        {/* =====================================================
            RIGHT ARROW
        ===================================================== */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label={t("aria.nextSlide")}
          className="
            absolute
            right-2
            top-1/2
            z-[100]

            flex
            -translate-y-1/2
            items-center
            justify-center

            rounded-full

            border
            border-gray-200

            bg-white/95

            shadow-lg

            backdrop-blur-sm

            transition-all
            duration-300

            hover:scale-110
            hover:bg-white

            active:scale-95

            w-9
            h-9

            sm:right-4
            sm:w-10
            sm:h-10

            md:right-6
            md:w-11
            md:h-11

            lg:right-8
            lg:w-12
            lg:h-12

            xl:right-10
          "
        >
          <ChevronRight
            className="
              h-4
              w-4

              sm:h-5
              sm:w-5

              md:h-6
              md:w-6

              text-gray-800
            "
          />
        </button>
      </div>

      {/* =====================================================
          DOTS
      ===================================================== */}

      <div
        className="
          relative
          z-[100]

          mt-3

          flex
          justify-center
          gap-1.5

          sm:mt-5
          sm:gap-2
        "
      >
        {projects.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`${t(
              "aria.goToSlide"
            )} ${index + 1}`}
            className={`
              h-[7px]
              w-[7px]
              rounded-full

              transition-all
              duration-300

              ${index === currentIndex
                ? "bg-gray-500"
                : "bg-gray-300 hover:bg-gray-400"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default Ideas;