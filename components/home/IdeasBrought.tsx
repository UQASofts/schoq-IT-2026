"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import {
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
} from "lucide-react";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

gsap.registerPlugin(ScrollTrigger);

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["700"],
});

const cases = [
    {
        id: "myanza",
        title: "MyAnza",
        category: "Social Platform",
        description:
            "MyAnza is a privacy-first social platform built for secure, authentic, and meaningful digital interactions. Users can share content, connect, exchange messages, and engage in real-time conversations through a modern responsive experience designed for scalability, security, and trust.",
        image: "/Idea1.webp",
        href: "https://myanza.com",
    },
    {
        id: "hilfehafen",
        title: "Hilfehafen",
        category: "Workforce Platform",
        description:
            "Hilfehafen is an employee attendance and workforce management platform engineered for clarity and reliability. It streamlines daily operations with intuitive workflows, accurate tracking, and a product experience built for teams that need speed without sacrificing control.",
        image: "/Idea2.webp",
        href: "https://hilfehafen.de/",
    },
    {
        id: "amin-hotel",
        title: "Amin Hotel",
        category: "Hospitality Experience",
        description:
            "Amin Hotel website offers guests a seamless digital experience to explore the hotel’s rooms, amenities, dining options, and services. Guests can easily browse room details, check available options, book their stay online, and order delicious food directly from the hotel’s internal restaurant. The platform is designed to make every part of the guest experience simple, convenient, and enjoyable.",
        image: "/Idea3.webp",
        href: "https://aminhotel.com/",
    },
];


export default function IdeasBrought() {
    const t = useTranslations("Home.Ideas");
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isInView, setIsInView] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);

    const dragStartX = useRef(0);
    const dragOffsetRef = useRef(0);
    const didDrag = useRef(false);

    /*
    |--------------------------------------------------------------------------
    | VIEWPORT OBSERVER
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                threshold: 0.25,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | NAVIGATION
    |--------------------------------------------------------------------------
    */

    const goTo = useCallback((index: number) => {
        setActive(
            (index + cases.length) % cases.length
        );
        setDragOffset(0);
    }, []);

    const next = useCallback(() => {
        setActive((prev) => (prev + 1) % cases.length);
        setDragOffset(0);
    }, []);

    const prev = useCallback(() => {
        setActive(
            (prev) =>
                (prev - 1 + cases.length) %
                cases.length
        );
        setDragOffset(0);
    }, []);

    /*
    |--------------------------------------------------------------------------
    | AUTOPLAY
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!isInView || paused || isDragging) {
            return;
        }

        const timer = setInterval(() => {
            setActive(
                (prevIndex) =>
                    (prevIndex + 1) % cases.length
            );
        }, 5500);

        return () => clearInterval(timer);
    }, [isInView, paused, isDragging]);

    /*
    |--------------------------------------------------------------------------
    | DRAG
    |--------------------------------------------------------------------------
    */

    const finishDrag = useCallback(() => {
        const offset = dragOffsetRef.current;

        dragOffsetRef.current = 0;
        setIsDragging(false);

        if (offset < -70) {
            setDragOffset(0);
            next();
            return;
        }

        if (offset > 70) {
            setDragOffset(0);
            prev();
            return;
        }

        setDragOffset(0);
    }, [next, prev]);

    const handlePointerDown = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        if (event.button !== 0) return;

        const target = event.target as HTMLElement;

        if (target.closest("a, button")) {
            return;
        }

        didDrag.current = false;

        dragStartX.current = event.clientX;
        dragOffsetRef.current = 0;

        setIsDragging(true);
        setPaused(true);

        event.currentTarget.setPointerCapture(
            event.pointerId
        );
    };

    const handlePointerMove = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        if (!isDragging) return;

        const offset =
            event.clientX - dragStartX.current;

        if (Math.abs(offset) > 6) {
            didDrag.current = true;
        }

        dragOffsetRef.current = offset;
        setDragOffset(offset);
    };

    const handlePointerUp = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        if (!isDragging) return;

        if (
            event.currentTarget.hasPointerCapture(
                event.pointerId
            )
        ) {
            event.currentTarget.releasePointerCapture(
                event.pointerId
            );
        }

        finishDrag();
    };

    /*
    |--------------------------------------------------------------------------
    | GET CARD POSITION
    |--------------------------------------------------------------------------
    |
    | 0 = Active
    | 1 = Behind active
    | 2 = Behind second
    |--------------------------------------------------------------------------
    */

    const getPosition = (index: number) => {
        return (
            (index - active + cases.length) %
            cases.length
        );
    };

    const getCardStyle = (
        position: number
    ): React.CSSProperties => {
        // ACTIVE CARD
        if (position === 0) {
            return {
                width: "60%",
                height: "500px",
                right: "5%",
                top: "50%",
                transform: `translateY(-50%) translateX(${dragOffset}px)`,
                opacity: 1,
                zIndex: 30,
                background: "#ffffff",
                border: "1px solid #E8E8E8",
                boxShadow:
                    "0 28px 70px -30px rgba(11,28,48,0.45), 0 10px 24px -12px rgba(11,28,48,0.2)",
            };
        }

        // SECOND CARD
        if (position === 1) {
            return {
              width: "52%",
              height: "450px",
              right: "30%",
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.92,
              zIndex: 20,
              background: "white",
              border: "1px solid #E8E8E8",
              boxShadow:
                "0 18px 44px -16px rgba(11,28,48,0.24), 0 6px 18px -8px rgba(11,28,48,0.14)",
            };
        }

        // THIRD CARD
        return {
          width: "44%",
          height: "400px",
          left: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0.78,
          zIndex: 10,
          background: "white",
          border: "1px solid #E8E8E8",
          boxShadow:
            "0 26px 58px -14px rgba(11,28,48,0.34), 0 10px 28px -10px rgba(89,154,227,0.16)",
        };
    };

    /*
    |--------------------------------------------------------------------------
    | GSAP SCROLL ANIMATIONS
    |--------------------------------------------------------------------------
    */

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const ctx = gsap.context(() => {
                if (headingRef.current) {
                    gsap.from(
                        headingRef.current,
                        {
                            y: 40,
                            opacity: 0,
                            duration: 0.85,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger:
                                    headingRef.current,
                                start: "top 80%",
                                once: true,
                            },
                        }
                    );
                }

                if (cardsRef.current) {
                    gsap.from(
                        cardsRef.current,
                        {
                            y: 40,
                            opacity: 0,
                            duration: 0.85,
                            delay: 0.15,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger:
                                    cardsRef.current,
                                start: "top 80%",
                                once: true,
                            },
                        }
                    );
                }

                if (controlsRef.current) {
                    gsap.from(
                        controlsRef.current,
                        {
                            y: 40,
                            opacity: 0,
                            duration: 0.75,
                            delay: 0.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger:
                                    controlsRef.current,
                                start: "top 85%",
                                once: true,
                            },
                        }
                    );
                }
            }, sectionRef);

            return () => ctx.revert();
        },
        {
            scope: sectionRef,
        }
    );

    /*
    |--------------------------------------------------------------------------
    | CARD TRANSITION
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!cardsRef.current) return;

        const cards =
            cardsRef.current.querySelectorAll<HTMLElement>(
                "[data-case-card]"
            );

        if (!cards.length) return;

        gsap.fromTo(
            cards,
            {
                opacity: 0.5,
            },
            {
                opacity: 1,
                duration: 0.35,
                stagger: 0.03,
                ease: "power2.out",
            }
        );
    }, [active]);

    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (
      <section
        ref={sectionRef}
        id="our-work"
        className="relative w-full overflow-x-clip bg-cover bg-center bg-no-repeat py-8 md:py-16"
        style={{
          backgroundImage: "url('/homePagePic/ServicesBanner.png')",
        }}
      >
        {/* TOP GRADIENT */}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />

        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center gap-2 sm:gap-3">
          {/* ======================================================
                    HEADING
                ====================================================== */}

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

          {/* ======================================================
                    CAROUSEL
                ====================================================== */}

          <div
            ref={cardsRef}
            className="relative flex w-full flex-col gap-2 [overflow-anchor:none] sm:gap-3"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* TOP GLOW */}
            <div className="pointer-events-none absolute left-0 top-0 z-0 h-[55%] w-full bg-gradient-to-r from-[#4A4CE6]/10 via-white to-[#4A4CE6]/10 blur-xl" />

            {/* BOTTOM GLOW */}
            <div
              className=" pointer-events-none absolute bottom-0 left-0 z-0 h-[55%] w-full bg-gradient-to-r from-[#4BE191]/10 via-white to-[#4BE191]/10 blur-xl
          "
            />
            <div
              className={`relative mx-auto h-[560px] w-full max-w-[1400px] touch-pan-y select-none [overflow-anchor:none] sm:h-[500px] md:h-[500px] xl:h-[560px] ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {cases.map((item, index) => {
                const position = getPosition(index);

                const isActive = position === 0;

                const cardStyle = getCardStyle(position);

                return (
                  <article
                    key={item.id}
                    data-case-card
                    onClick={() => {
                      if (didDrag.current || isActive) {
                        return;
                      }

                      goTo(index);
                    }}
                    className="absolute overflow-hidden rounded-lg"
                    style={{
                      ...cardStyle,

                      transition: isDragging
                        ? "none"
                        : "right 0.5s ease, width 0.5s ease, height 0.5s ease, transform 0.5s ease, opacity 0.5s ease",
                    }}
                  >
                    <div className="flex h-full w-full flex-col md:flex-row">
                      {/* ==================================================
                                                CONTENT
                                            ================================================== */}

                      <div
                        className={`flex h-[60%] w-full shrink-0 flex-col justify-between gap-1 overflow-hidden p-3 sm:h-[50%] md:h-full md:w-[40%] md:gap-3 md:p-4 xl:p-6 ${
                          !isActive
                            ? "pointer-events-none bg-gradient-to-r from-[#575EE3]/10 to-[#56D59A]/10 "
                            : "bg-white"
                        }`}
                      >
                        <div className="flex h-full flex-col gap-2 overflow-hidden md:gap-3 lg:gap-5">
                          <span className="inline-flex w-fit rounded-full border border-[#575EE3]/25 bg-gradient-to-r from-[#575EE3]/10 to-[#56D59A]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#575EE3]">
                            {item.category}
                          </span>

                          <h3
                            className={`${plusJakarta.className} text-lg font-bold text-[#0B1C30] md:mt-3 md:text-2xl xl:text-3xl`}
                          >
                            {item.title}
                          </h3>

                          <p className="text-xs text-[#434655] lg:text-sm xl:text-base">
                            {item.description}
                          </p>
                        </div>

                        {isActive && (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#575EE3] to-[#56D59A] px-4 py-1 text-xs text-white transition hover:opacity-95 md:py-2 md:text-sm md:font-semibold"
                          >
                            Visit
                            <ArrowUpRight size={16} />
                          </a>
                        )}
                      </div>

                      {/* ==================================================
                                                IMAGE
                                            ================================================== */}

                      <div className="relative h-[40%] w-full bg-[#F7F8FC]/40 sm:h-[50%] md:h-full md:w-[60%]">
                        <Image
                          src={item.image}
                          alt={`${item.title} case study`}
                          fill
                          draggable={false}
                          sizes="(max-width: 768px) 100vw, 60vw"
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* ======================================================
                        CONTROLS
                    ====================================================== */}

            <div
              ref={controlsRef}
              className="flex items-center justify-center gap-4"
            >
              <button
                type="button"
                aria-label="Previous case"
                onClick={prev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0B1C30] shadow-sm transition hover:border-[#56D59A] hover:text-[#575EE3] z-10"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {cases.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Go to ${item.title}`}
                    onClick={() => goTo(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === active
                        ? "w-8 bg-gradient-to-r from-[#575EE3] to-[#56D59A] z-10"
                        : "w-2.5 bg-[#D1D5DB] hover:bg-[#B0B5BD] z-10"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next case"
                onClick={next}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0B1C30] shadow-sm transition hover:border-[#575EE3] hover:text-[#56D59A] z-10"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
}
