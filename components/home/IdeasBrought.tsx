"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import {
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
    const [previewId, setPreviewId] = useState<string | null>(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);
    const cardItemRefs = useRef<(HTMLElement | null)[]>([]);

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

    useEffect(() => {
        const media = window.matchMedia("(max-width: 767px)");
        const update = () => setIsSmallScreen(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
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
        setPreviewId(null);
    }, []);

    const prev = useCallback(() => {
        setActive(
            (prev) =>
                (prev - 1 + cases.length) %
                cases.length
        );
        setDragOffset(0);
        setPreviewId(null);
    }, []);

    /*
    |--------------------------------------------------------------------------
    | AUTOPLAY
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!isInView || paused || isDragging || previewId) {
            return;
        }

        const timer = setInterval(() => {
            next();
        }, 5500);

        return () => clearInterval(timer);
    }, [isInView, paused, isDragging, previewId, next]);

    /*
    |--------------------------------------------------------------------------
    | DRAG
    |--------------------------------------------------------------------------
    */

    const resetDragTransform = useCallback(() => {
        cardItemRefs.current.forEach((el) => {
            if (!el) return;
            gsap.set(el, { x: 0, yPercent: -50 });
        });
    }, []);

    const finishDrag = useCallback(() => {
        const offset = dragOffsetRef.current;

        dragOffsetRef.current = 0;
        setIsDragging(false);
        setDragOffset(0);
        resetDragTransform();

        if (offset < -70) {
            next();
            return;
        }

        if (offset > 70) {
            prev();
        }
    }, [next, prev, resetDragTransform]);

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
        if (position === 0) {
            return {
                width: isSmallScreen ? "75%" : "58%",
                height: "92%",
                left: isSmallScreen ? "25%" : "42%",
                top: "50%",
                opacity: 1,
                zIndex: 30,
                background: "#ffffff",
                border: "1px solid #E8E8E8",
                boxShadow:
                    "0 28px 70px -30px rgba(11,28,48,0.45), 0 10px 24px -12px rgba(11,28,48,0.2)",
            };
        }

        if (position === 1) {
            return {
              width: isSmallScreen ? "65%" : "50%",
              height: "82%",
              left: isSmallScreen ? "10%" : "18%",
              top: "50%",
              opacity: 1,
              zIndex: 20,
              background: "white",
              border: "1px solid #E8E8E8",
              boxShadow:
                "0 18px 44px -16px rgba(11,28,48,0.24), 0 6px 18px -8px rgba(11,28,48,0.14)",
            };
        }

        return {
          width: isSmallScreen ? "58%" : "46%",
          height: "72%",
          left: "0%",
          top: "50%",
          opacity: 1,
          zIndex: 10,
          background: "white",
          border: "1px solid #E8E8E8",
          boxShadow:
            "0 26px 58px -14px rgba(11,28,48,0.34), 0 10px 28px -10px rgba(89,154,227,0.16)",
        };
    };

    /*
    |--------------------------------------------------------------------------
    | HEADER ANIMATION
    |--------------------------------------------------------------------------
    */

    useGSAP(
        () => {
            const headerTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    end: "bottom 60%",
                    toggleActions: "play reverse play reverse",
                },
            });

            headerTimeline.from(".header-two", {
                y: "100%",
                duration: 1.1,
                ease: "power4.out",
            });
        },
        { scope: sectionRef },
    );


    useGSAP(
        () => {
            const entranceConfigs = [
                { x: 250, y: 0, rotation: 8 },
                { x: 0, y: 180, rotation: -5 },
                { x: 0, y: 180, rotation: -5 },
            ];

            cardItemRefs.current.forEach((el) => {
                if (!el) return;
                gsap.set(el, { yPercent: -50 });
            });

            const cardsTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".start-btn",
                    start: "top 85%",
                    toggleActions: "play none play reverse",
                },
                defaults: {
                    duration: 0.9,
                    ease: "power3.out",
                },
            });

            entranceConfigs.forEach((config, index) => {
                const el = cardItemRefs.current[index];
                if (!el) return;

                gsap.set(el, { yPercent: -50 });

                cardsTl.fromTo(
                    el,
                    {
                        x: config.x,
                        y: config.y,
                        yPercent: -50,
                        opacity: 0,
                        rotation: config.rotation,
                    },
                    {
                        x: 0,
                        y: 0,
                        yPercent: -50,
                        rotation: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "power3.out",
                    },
                    index === 0 ? 0 : "-=0.7",
                );
            });
        },
        { scope: sectionRef, dependencies: [] },
    );

    useEffect(() => {
        cardItemRefs.current.forEach((el, index) => {
            if (!el) return;
            const isActiveCard = getPosition(index) === 0;
            gsap.set(el, {
                x: isDragging && isActiveCard ? dragOffset : 0,
                yPercent: -50,
            });
        });
    }, [dragOffset, isDragging, active]);

    return (
      <section
        ref={sectionRef}
        id="our-work"
        className="relative w-full overflow-x-clip bg-white py-8 md:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,#ffffff_0%,#ffffff_38%,#eef3ff_72%,#eafaf8_100%)]" />
        <div className="pointer-events-none absolute -top-10 left-[8%] h-64 w-64 rounded-full bg-[#4A4CE6]/18 blur-3xl" />
        <div className="pointer-events-none absolute top-[18%] right-[12%] h-72 w-72 rounded-full bg-[#575EE3]/12 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-[18%] h-72 w-80 rounded-full bg-[#4BE191]/16 blur-3xl" />

        <div className="relative mx-auto flex w-full  flex-col items-center gap-2 px-[4%] sm:gap-3 md:px-[8.61%]">

          <div className="relative z-10 w-full">
            <div className="header-one mb-2">
              <h2 className="text-center uppercase text-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl">
                {t("titleLine1")}
                <br />
                {t("titleLine2")}
              </h2>
            </div>

            <div
              className="
                            header-two
                            mb-8
                            grid
                            grid-cols-1
                            place-items-center
                            gap-4
                            overflow-hidden
                            py-1
                
                            sm:mb-10
                            sm:gap-5
                
                            md:mb-12
                          "
            >
              <p className="w-[92%] max-w-[620px] text-center text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
                {t("description")}
              </p>

              <div className="flex items-center justify-center">
                <Link
                  href="#"
                  className="start-btn inline-block bg-global px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-global sm:rounded-global-sm sm:px-6 sm:py-3 md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
                >
                  {t("buttonStartProject")}
                </Link>
              </div>
            </div>
          </div>

          <div
            ref={cardsRef}
            className="relative flex w-full flex-col gap-2 [overflow-anchor:none] sm:gap-3"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* TOP GLOW */}
            <div className="pointer-events-none absolute left-0 top-0 z-0 h-[55%] w-full bg-gradient-to-r from-[#4A4CE6]/15 via-white to-[#4A4CE6]/15 blur-3xl" />

            <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-[55%] w-full bg-gradient-to-r from-[#4BE191]/15 via-white to-[#4BE191]/15 blur-3xl" />
            <div
              className={`relative mx-auto h-[420px] w-full touch-pan-y select-none [overflow-anchor:none] sm:h-[460px] md:h-[500px] xl:h-[560px] ${
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
                    ref={(el) => {
                      cardItemRefs.current[index] = el;
                    }}
                    data-case-card
                    onClick={() => {
                      if (didDrag.current) {
                        return;
                      }

                      setPreviewId((current) =>
                        current === item.id ? null : item.id,
                      );

                      if (!isActive) {
                        goTo(index);
                      }
                    }}
                    className="group absolute overflow-hidden rounded-global sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
                    style={{
                      ...cardStyle,

                      transition: isDragging
                        ? "none"
                        : "left 0.7s cubic-bezier(0.215, 0.61, 0.355, 1), width 0.7s cubic-bezier(0.215, 0.61, 0.355, 1), height 0.7s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.7s cubic-bezier(0.215, 0.61, 0.355, 1)",
                    }}
                  >
                    <div className={`flex h-full w-full flex-col ${isActive ? "lg:flex-row" : ""}`}>

                      <div
                        className={`flex h-full w-full shrink-0 flex-col justify-between gap-1 p-3 transition-opacity duration-300 md:gap-3 md:p-4 xl:p-6 md:max-lg:group-hover:opacity-0 ${
                          previewId === item.id ? "max-md:opacity-0" : ""
                        } ${
                          isActive
                            ? "bg-white lg:w-[42%] lg:overflow-hidden"
                            : "pointer-events-none bg-gradient-to-r from-[#575EE3]/10 to-[#56D59A]/10"
                        }`}
                      >
                        <div className="flex flex-col gap-2 md:gap-3 lg:h-full lg:gap-5 lg:overflow-hidden">
                          <span className="inline-flex w-fit rounded-full border border-[#575EE3]/25 bg-gradient-to-r from-[#575EE3]/10 to-[#56D59A]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#575EE3]">
                            {item.category}
                          </span>

                          <h3
                            className={`${plusJakarta.className} text-lg font-bold text-[#0B1C30] md:mt-3 md:text-2xl xl:text-3xl`}
                          >
                            {item.title}
                          </h3>

                          <p className="shrink-0 text-[#434655] text-p sm:text-p-sm md:text-p-md lg:shrink lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
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

                      <div
                        className={`pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100 lg:hidden ${
                          previewId === item.id ? "max-md:opacity-100" : ""
                        }`}
                      >
                        <Image
                          src={item.image}
                          alt={`${item.title} case study`}
                          fill
                          draggable={false}
                          sizes="(max-width: 1023px) 100vw, 0px"
                          className="object-cover object-center"
                        />
                      </div>

                      <div
                        className={`relative hidden h-full w-[60%] bg-[#F7F8FC]/40 ${
                          isActive ? "lg:block" : ""
                        }`}
                      >
                        <Image
                          src={item.image}
                          alt={`${item.title} case study`}
                          fill
                          draggable={false}
                          sizes="60vw"
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div
              ref={controlsRef}
              className="relative z-[100] mt-3 flex justify-center gap-1.5 sm:mt-5 sm:gap-2"
            >
              {cases.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to ${item.title}`}
                  onClick={() => {
                    setPreviewId(null);
                    goTo(index);
                  }}
                  className={`h-[7px] w-[7px] rounded-full transition-all duration-300 ${
                    index === active
                      ? "bg-gray-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
}
