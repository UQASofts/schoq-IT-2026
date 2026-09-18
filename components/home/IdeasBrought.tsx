"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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

const CASE_ASSETS = [
    {
        id: "myanza",
        image: "/Idea1.webp",
        href: "https://myanza.com",
    },
    {
        id: "hilfehafen",
        image: "/Idea2.webp",
        href: "https://hilfehafen.de/",
    },
    {
        id: "amin-hotel",
        image: "/Idea3.webp",
        href: "https://aminhotel.com/",
    },
];

type TranslatedCase = {
    id: string;
    title: string;
    category: string;
    description: string;
    visitLabel?: string;
    imageAlt?: string;
};

export default function IdeasBrought() {
    const t = useTranslations("Home.Ideas");
    const translatedCases = t.raw("cases") as TranslatedCase[];
    const cases = CASE_ASSETS.map((asset) => {
        const copy = translatedCases.find((item) => item.id === asset.id);
        return {
            ...asset,
            title: copy?.title ?? asset.id,
            category: copy?.category ?? "",
            description: copy?.description ?? "",
            visitLabel: copy?.visitLabel,
            imageAlt: copy?.imageAlt,
        };
    });
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [previewId, setPreviewId] = useState<string | null>(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isTabletScreen, setIsTabletScreen] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);
    const cardItemRefs = useRef<(HTMLElement | null)[]>([]);

    const dragStartX = useRef(0);
    const dragOffsetRef = useRef(0);
    const didDrag = useRef(false);
    const draggingRef = useRef(false);
    const animatingRef = useRef(false);
    const activeRef = useRef(0);
    const isSmallScreenRef = useRef(false);
    const swipeTweenRef = useRef<gsap.core.Tween | null>(null);
    const dragRafRef = useRef(0);
    const pendingDirectionRef = useRef<1 | -1 | null>(null);
    const swipeProgressRef = useRef(0);
    const stackRef = useRef<HTMLDivElement>(null);

   

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
        const small = window.matchMedia("(max-width: 767px)");
        const tablet = window.matchMedia(
            "(min-width: 768px) and (max-width: 1399px)",
        );
        const update = () => {
            setIsSmallScreen(small.matches);
            setIsTabletScreen(tablet.matches);
        };
        update();
        small.addEventListener("change", update);
        tablet.addEventListener("change", update);
        return () => {
            small.removeEventListener("change", update);
            tablet.removeEventListener("change", update);
        };
    }, []);

 

    useEffect(() => {
        isSmallScreenRef.current = isSmallScreen;
    }, [isSmallScreen]);

    useEffect(() => {
        const el = stackRef.current;
        if (!el) return;

        const onTouchMove = (event: TouchEvent) => {
            if (draggingRef.current && didDrag.current) {
                event.preventDefault();
            }
        };

        el.addEventListener("touchmove", onTouchMove, { passive: false });
        return () => el.removeEventListener("touchmove", onTouchMove);
    }, []);

    useEffect(() => {
        if (draggingRef.current || animatingRef.current) return;
        activeRef.current = active;
    }, [active]);

    const cardCount = cases.length;

    const getLayouts = (small: boolean) => [
        {
            width: small ? 75 : 58,
            height: 92,
            left: small ? 25 : 42,
            zIndex: 30,
        },
        {
            width: small ? 65 : 50,
            height: 82,
            left: small ? 10 : 18,
            zIndex: 20,
        },
        {
            width: small ? 58 : 46,
            height: 72,
            left: 0,
            zIndex: 10,
        },
    ];

    const mixLayout = (
        from: { width: number; height: number; left: number; zIndex: number },
        to: { width: number; height: number; left: number; zIndex: number },
        t: number,
    ) => ({
        width: from.width + (to.width - from.width) * t,
        height: from.height + (to.height - from.height) * t,
        left: from.left + (to.left - from.left) * t,
        zIndex: t > 0.4 ? to.zIndex : from.zIndex,
    });

    const applyCard = (
        el: HTMLElement,
        layout: { width: number; height: number; left: number; zIndex: number },
        extras: gsap.TweenVars = {},
    ) => {
        gsap.set(el, {
            width: `${layout.width}%`,
            height: `${layout.height}%`,
            left: `${layout.left}%`,
            top: `${(100 - layout.height) / 2}%`,
            zIndex: layout.zIndex,
            yPercent: 0,
            y: 0,
            ...extras,
        });
    };

    const applySwipe = useCallback(
        (offset: number, progress: number) => {
            const layouts = getLayouts(true);
            const t = Math.min(Math.max(progress, 0), 1);
            const pop = t;
            const goingLeft = offset <= 0;
            const activeIndex = activeRef.current;
            const front = cardItemRefs.current[activeIndex];
            const height = front?.offsetHeight || 400;
            const ratio = Math.max(-0.98, Math.min(0.98, offset / height));
            const rotation = (Math.asin(ratio) * 180) / Math.PI;

            cardItemRefs.current.forEach((el, index) => {
                if (!el) return;
                const position =
                    (index - activeIndex + cardCount) % cardCount;

                if (position === 0) {
                    applyCard(el, { ...layouts[0], zIndex: 40 }, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        force3D: true,
                        transformOrigin: goingLeft ? "0% 100%" : "100% 100%",
                        rotation,
                    });
                    return;
                }

                if (goingLeft) {
                    if (position === 1) {
                        applyCard(el, mixLayout(layouts[1], layouts[0], pop), {
                            x: 0,
                            scale: 1,
                            rotation: 0,
                            force3D: true,
                            transformOrigin: "50% 50%",
                        });
                    } else {
                        applyCard(el, mixLayout(layouts[2], layouts[1], pop), {
                            x: 0,
                            scale: 1,
                            rotation: 0,
                            force3D: true,
                            transformOrigin: "50% 50%",
                        });
                    }
                    return;
                }

                if (position === 2) {
                    applyCard(el, mixLayout(layouts[2], layouts[0], pop), {
                        x: 0,
                        scale: 1,
                        rotation: 0,
                        force3D: true,
                        transformOrigin: "50% 50%",
                    });
                } else {
                    applyCard(el, mixLayout(layouts[1], layouts[2], pop), {
                        x: 0,
                        scale: 1,
                        rotation: 0,
                        force3D: true,
                        transformOrigin: "50% 50%",
                    });
                }
            });
        },
        [cardCount],
    );

    const layoutCards = useCallback(
        (activeIndex: number) => {
            const layouts = getLayouts(isSmallScreenRef.current);
            cardItemRefs.current.forEach((el, index) => {
                if (!el) return;
                const position =
                    (index - activeIndex + cardCount) % cardCount;
                const layout = layouts[Math.min(position, layouts.length - 1)];
                gsap.set(el, {
                    width: `${layout.width}%`,
                    height: `${layout.height}%`,
                    left: `${layout.left}%`,
                    top: isSmallScreenRef.current
                        ? `${(100 - layout.height) / 2}%`
                        : "50%",
                    zIndex: layout.zIndex,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    yPercent: isSmallScreenRef.current ? 0 : -50,
                    transformOrigin: "50% 50%",
                });
            });
        },
        [cardCount],
    );

    const settleSwipe = useCallback(
        (commit: boolean, syncState = true) => {
            swipeTweenRef.current?.kill();
            swipeTweenRef.current = null;
            animatingRef.current = false;
            dragOffsetRef.current = 0;
            swipeProgressRef.current = 0;

            if (commit && pendingDirectionRef.current) {
                const to =
                    (activeRef.current + pendingDirectionRef.current + cardCount) %
                    cardCount;
                pendingDirectionRef.current = null;
                activeRef.current = to;
                layoutCards(to);
                if (syncState) setActive(to);
                return;
            }

            pendingDirectionRef.current = null;
            layoutCards(activeRef.current);
        },
        [cardCount, layoutCards],
    );

    const animateSwipe = useCallback(
        (direction: 1 | -1) => {
            swipeTweenRef.current?.kill();
            animatingRef.current = true;
            pendingDirectionRef.current = direction;
            setPreviewId(null);

            const from = activeRef.current;
            const to = (from + direction + cardCount) % cardCount;
            const startOffset = dragOffsetRef.current;
            const startProgress = Math.min(Math.abs(startOffset) / 90, 1);
            const front = cardItemRefs.current[from];
            const height = front?.offsetHeight || 400;
            const endOffset =
                direction === 1
                    ? -Math.max(Math.abs(startOffset), height * 0.72)
                    : Math.max(Math.abs(startOffset), height * 0.72);
            const proxy = { t: 0 };

            swipeTweenRef.current = gsap.to(proxy, {
                t: 1,
                duration: 0.4 * Math.max(0.35, 1 - startProgress * 0.6),
                ease: "power3.out",
                overwrite: true,
                onUpdate: () => {
                    const offset = startOffset + (endOffset - startOffset) * proxy.t;
                    const progress = startProgress + (1 - startProgress) * proxy.t;
                    swipeProgressRef.current = progress;
                    applySwipe(offset, progress);
                },
                onComplete: () => {
                    pendingDirectionRef.current = null;
                    setActive(to);
                    activeRef.current = to;
                    dragOffsetRef.current = 0;
                    swipeProgressRef.current = 0;
                    layoutCards(to);
                    animatingRef.current = false;
                    swipeTweenRef.current = null;
                },
                onInterrupt: () => {
                    animatingRef.current = false;
                    swipeTweenRef.current = null;
                },
            });
        },
        [applySwipe, cardCount, layoutCards],
    );

    const goTo = useCallback((index: number) => {
        const nextIndex = (index + cardCount) % cardCount;
        if (nextIndex === activeRef.current) return;
        setPreviewId(null);

        if (isSmallScreenRef.current) {
            const forward =
                (nextIndex - activeRef.current + cardCount) % cardCount;
            animateSwipe(forward === 1 ? 1 : -1);
            return;
        }

        setActive(nextIndex);
        activeRef.current = nextIndex;
    }, [animateSwipe, cardCount]);

    const next = useCallback(() => {
        if (isSmallScreenRef.current) {
            animateSwipe(1);
            return;
        }

        setActive((current) => (current + 1) % cardCount);
        setPreviewId(null);
    }, [animateSwipe, cardCount]);

    const prev = useCallback(() => {
        if (isSmallScreenRef.current) {
            animateSwipe(-1);
            return;
        }

        setActive(
            (current) => (current - 1 + cardCount) % cardCount
        );
        setPreviewId(null);
    }, [animateSwipe, cardCount]);

   

    useEffect(() => {
        if (!isInView || paused || isDragging || previewId) {
            return;
        }

        const timer = setInterval(() => {
            if (animatingRef.current || draggingRef.current) return;
            next();
        }, 5500);

        return () => clearInterval(timer);
    }, [isInView, paused, isDragging, previewId, next]);

   

    const snapBack = useCallback(() => {
        if (isSmallScreenRef.current) {
            const startOffset = dragOffsetRef.current;
            const startProgress = Math.min(Math.abs(startOffset) / 90, 1);
            if (startProgress === 0) {
                layoutCards(activeRef.current);
                dragOffsetRef.current = 0;
                return;
            }
            swipeTweenRef.current?.kill();
            animatingRef.current = true;
            const proxy = { t: startProgress };
            swipeTweenRef.current = gsap.to(proxy, {
                t: 0,
                duration: 0.28,
                ease: "power3.out",
                overwrite: true,
                onUpdate: () => {
                    applySwipe(
                        startOffset * (proxy.t / Math.max(startProgress, 0.001)),
                        proxy.t,
                    );
                },
                onComplete: () => {
                    dragOffsetRef.current = 0;
                    swipeProgressRef.current = 0;
                    layoutCards(activeRef.current);
                    animatingRef.current = false;
                    swipeTweenRef.current = null;
                },
                onInterrupt: () => {
                    animatingRef.current = false;
                    swipeTweenRef.current = null;
                },
            });
            return;
        }

        cardItemRefs.current.forEach((el) => {
            if (!el) return;
            gsap.to(el, { x: 0, yPercent: -50, duration: 0.3, ease: "power3.out" });
        });
        dragOffsetRef.current = 0;
    }, [applySwipe, layoutCards]);

    const finishDrag = useCallback(() => {
        const offset = dragOffsetRef.current;

        draggingRef.current = false;
        setIsDragging(false);
        setPaused(false);
        setActive((current) =>
            current === activeRef.current ? current : activeRef.current,
        );

        const threshold = isSmallScreenRef.current ? 48 : 70;

        if (offset < -threshold) {
            if (!isSmallScreenRef.current) {
                cardItemRefs.current.forEach((el) => {
                    if (!el) return;
                    gsap.set(el, { x: 0, yPercent: -50 });
                });
                dragOffsetRef.current = 0;
            }
            next();
            return;
        }

        if (offset > threshold) {
            if (!isSmallScreenRef.current) {
                cardItemRefs.current.forEach((el) => {
                    if (!el) return;
                    gsap.set(el, { x: 0, yPercent: -50 });
                });
                dragOffsetRef.current = 0;
            }
            prev();
            return;
        }

        snapBack();
    }, [next, prev, snapBack]);

    const handlePointerDown = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        if (event.button !== 0) return;

        const target = event.target as HTMLElement;

        if (target.closest("a, button")) {
            return;
        }

        if (dragRafRef.current) {
            cancelAnimationFrame(dragRafRef.current);
            dragRafRef.current = 0;
        }

        if (isSmallScreenRef.current) {
            settleSwipe(swipeProgressRef.current > 0.55, false);
        } else {
            swipeTweenRef.current?.kill();
            swipeTweenRef.current = null;
            animatingRef.current = false;
        }

        didDrag.current = false;
        draggingRef.current = true;
        dragStartX.current = event.clientX;
        dragOffsetRef.current = 0;
        swipeProgressRef.current = 0;

        if (isSmallScreenRef.current) {
            event.currentTarget.style.touchAction = "none";
        }

        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        if (!draggingRef.current) return;

        const offset = event.clientX - dragStartX.current;

        if (Math.abs(offset) > 6) {
            didDrag.current = true;
            event.preventDefault();
        }

        dragOffsetRef.current = offset;

        if (!isSmallScreenRef.current) {
            const activeEl = cardItemRefs.current[activeRef.current];
            if (activeEl) {
                gsap.set(activeEl, { x: offset, yPercent: -50 });
            }
            return;
        }

        if (dragRafRef.current) return;
        dragRafRef.current = requestAnimationFrame(() => {
            dragRafRef.current = 0;
            if (!draggingRef.current) return;
            const current = dragOffsetRef.current;
            const front = cardItemRefs.current[activeRef.current];
            const height = front?.offsetHeight || 400;
            const progress = Math.min(Math.abs(current) / (height * 0.42), 1);
            swipeProgressRef.current = progress;
            applySwipe(current, progress);
        });
    };

    const handlePointerUp = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        if (!draggingRef.current) return;

        if (dragRafRef.current) {
            cancelAnimationFrame(dragRafRef.current);
            dragRafRef.current = 0;
        }

        if (
            event.currentTarget.hasPointerCapture(
                event.pointerId
            )
        ) {
            event.currentTarget.releasePointerCapture(
                event.pointerId
            );
        }

        event.currentTarget.style.touchAction = "pan-y";
        if (isSmallScreenRef.current) {
            const current = dragOffsetRef.current;
            const front = cardItemRefs.current[activeRef.current];
            const height = front?.offsetHeight || 400;
            applySwipe(
                current,
                Math.min(Math.abs(current) / (height * 0.42), 1),
            );
        }
        finishDrag();
    };


 
    const getPosition = (index: number) => {
        return (
            (index - active + cases.length) %
            cases.length
        );
    };

    const getCardStyle = (
        position: number
    ): React.CSSProperties => {
        const stack = isSmallScreen
            ? [
                  { width: "75%", left: "25%", height: 92 },
                  { width: "65%", left: "10%", height: 82 },
                  { width: "58%", left: "0%", height: 72 },
              ]
            : isTabletScreen
              ? [
                    { width: "82%", left: "16%", height: 92 },
                    { width: "72%", left: "7%", height: 82 },
                    { width: "64%", left: "0%", height: 72 },
                ]
              : [
                    { width: "58%", left: "42%", height: 92 },
                    { width: "50%", left: "18%", height: 82 },
                    { width: "46%", left: "0%", height: 72 },
                ];
        const size = stack[Math.min(position, stack.length - 1)];
        const top = isSmallScreen
            ? `${(100 - size.height) / 2}%`
            : "50%";

        if (position === 0) {
            return {
                width: size.width,
                height: `${size.height}%`,
                left: size.left,
                top,
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
              width: size.width,
              height: `${size.height}%`,
              left: size.left,
              top,
              opacity: 1,
              zIndex: 20,
              background: "white",
              border: "1px solid #E8E8E8",
              boxShadow:
                "0 18px 44px -16px rgba(11,28,48,0.24), 0 6px 18px -8px rgba(11,28,48,0.14)",
            };
        }

        return {
          width: size.width,
          height: `${size.height}%`,
          left: size.left,
          top,
          opacity: 1,
          zIndex: 10,
          background: "white",
          border: "1px solid #E8E8E8",
          boxShadow:
            "0 26px 58px -14px rgba(11,28,48,0.34), 0 10px 28px -10px rgba(89,154,227,0.16)",
        };
    };

    useGSAP(
        () => {
            const headerTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                    toggleActions: "play none none none",
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
            if (window.matchMedia("(max-width: 767px)").matches) {
                layoutCards(activeRef.current);
                return;
            }

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
                    once: true,
                    toggleActions: "play none none none",
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
        if (!isSmallScreen) {
            cardItemRefs.current.forEach((el) => {
                if (!el) return;
                gsap.set(el, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    yPercent: -50,
                    top: "50%",
                    transformOrigin: "50% 50%",
                });
            });
            return;
        }

        if (animatingRef.current || draggingRef.current) return;
        layoutCards(activeRef.current);
    }, [isSmallScreen, layoutCards]);

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

          <div className="relative z-20 w-full">
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
                  href="/contact"
                  className="start-btn inline-block bg-global px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-global sm:rounded-global-sm sm:px-6 sm:py-3 md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
                >
                  {t("buttonStartProject")}
                </Link>
              </div>
            </div>
          </div>

          <div
            ref={cardsRef}
            className="relative z-0 isolate flex w-full flex-col gap-2 [overflow-anchor:none] sm:gap-3"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* TOP GLOW */}
            <div className="pointer-events-none absolute left-0 top-0 z-0 h-[55%] w-full bg-gradient-to-r from-[#4A4CE6]/15 via-white to-[#4A4CE6]/15 blur-3xl" />

            <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-[55%] w-full bg-gradient-to-r from-[#4BE191]/15 via-white to-[#4BE191]/15 blur-3xl" />
            <div
              ref={stackRef}
              className={`relative mx-auto h-[420px] w-full select-none overflow-visible [overflow-anchor:none] sm:h-[460px] md:h-[500px] xl:h-[560px] ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{ touchAction: isSmallScreen || isDragging ? "none" : "pan-y" }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onLostPointerCapture={handlePointerUp}
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
                      willChange: isSmallScreen ? "transform" : undefined,
                      transition: isSmallScreen || isDragging
                        ? "none"
                        : "left 0.7s cubic-bezier(0.215, 0.61, 0.355, 1), width 0.7s cubic-bezier(0.215, 0.61, 0.355, 1), height 0.7s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.7s cubic-bezier(0.215, 0.61, 0.355, 1)",
                    }}
                  >
                    <div className={`flex h-full w-full flex-col ${isActive ? "xl:flex-row" : ""}`}>

                      <div
                        className={`flex h-full w-full shrink-0 flex-col justify-between gap-1 p-3 transition-opacity duration-300 md:gap-3 md:p-4 xl:p-6 md:max-xl:group-hover:opacity-0 ${
                          previewId === item.id ? "max-md:opacity-0" : ""
                        } ${
                          isActive
                            ? "bg-white xl:w-[42%] xl:overflow-hidden"
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

                          <p className="text-[#434655] text-p sm:text-p-sm md:text-p-md lg:shrink lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
                            {item.description}
                          </p>
                        </div>

                        {isActive && (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-global px-4 py-1 text-xs text-white transition hover:opacity-95 md:py-2 md:text-sm md:font-semibold"
                          >
                            {item.visitLabel ?? t("visit")}
                            <ArrowUpRight size={16} />
                          </a>
                        )}
                      </div>

                    

                      <div
                        className={`pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100 xl:hidden ${
                          previewId === item.id ? "max-md:opacity-100" : ""
                        }`}
                      >
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? `${item.title} case study`}
                          fill
                          draggable={false}
                          sizes="(max-width: 1023px) 100vw, 0px"
                          className="object-cover object-center"
                        />
                      </div>

                      <div
                        className={`relative hidden h-full w-[60%] bg-[#F7F8FC]/40 ${
                          isActive ? "xl:block" : ""
                        }`}
                      >
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? `${item.title} case study`}
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
