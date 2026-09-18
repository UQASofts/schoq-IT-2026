"use client";

import { useEffect, useState, useRef } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HeaderBorderStyle } from "../icons/Icons";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

import LanguageSwitcher from "./LanguageSwitch";
import { useTranslations } from "next-intl";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(
    null,
  );
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const openedByRef = useRef<"hover" | "click" | null>(null);
  const hoverCloseTimerRef = useRef<number>(0);

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const t = useTranslations("Layout.Header");
  const NAV_LINKS = [
    { name: t("home"), href: "/" },
    {
      name: t("services"),
      href: "#",
      children: [
        { title: t("customSoftware"), href: "/services/custom-software" },
        { title: t("webDevelopment"), href: "/services/web-development" },
        { title: t("mobileDevelopment"), href: "/services/mobile-development" },
        {
          title: t("artificialIntelligence"),
          href: "/services/artificial-intelligence",
        },
        {
          title: t("cloudInfrastructure"),
          href: "/services/cloud-infrastructure",
        },
        {
          title: t("graphicDesign"),
          href: "/services/graphic-design",
        },
        {
          title: t("programmingServices"),
          href: "/services/programming-services",
        },
      ],
    },
    { name: t("projects"), href: "/projects" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
  ];

  useGSAP(
    () => {
      gsap.from(logoRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(navRef.current?.children || [], {
        opacity: 0,
        y: -20,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(languageRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(ctaRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.5,
      });
    },
    { scope: headerRef },
  );

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setOpenDesktopMenu(null);
    openedByRef.current = null;
  }, [pathname]);

  useEffect(() => {
    if (!openDesktopMenu) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenDesktopMenu(null);
        openedByRef.current = null;
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDesktopMenu(null);
        openedByRef.current = null;
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDesktopMenu]);

  useGSAP(
    () => {
      const mobileLinks =
        mobileMenuRef.current?.querySelectorAll(".mobile-link");

      const tl = gsap.timeline({ paused: true });

      tl.set(overlayRef.current, { display: "block" })
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        })
        .fromTo(
          mobileMenuRef.current,
          { x: "100%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 0.4, ease: "power3.out" },
          "-=0.15",
        );

      if (mobileLinks && mobileLinks.length > 0) {
        tl.fromTo(
          mobileLinks,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2",
        );
      }

      menuTimelineRef.current = tl;

      return () => {
        tl.kill();
      };
    },
    { scope: headerRef },
  );

  useEffect(() => {
    if (menuTimelineRef.current) {
      if (isMobileMenuOpen) {
        menuTimelineRef.current.play();
      } else {
        menuTimelineRef.current.reverse();
      }
    }
  }, [isMobileMenuOpen]);

  const toggleMobileSubmenu = (name: string) => {
    setExpandedMobileMenu((prev) => (prev === name ? null : name));
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-[24px] md:top-[28px] lg:top-[37px] z-50 flex justify-center px-2 sm:px-4"
      >
        <div className="flex w-full max-w-[1000px] items-center justify-between  bg-white/40 px-4 md:px-6 py-4 shadow-[0_4px_24px_0_rgba(0,0,0,0.1)] backdrop-blur-md rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl">
          <div ref={logoRef} className="shrink-0">
            <Link href="/" className={`${geist.className} relative isolate block`}>
              <img
                src="/schoq-logo.svg?v=2"
                alt="SCHOQ"
                width={120}
                height={60}
                className="h-[40px] w-[81px] object-contain object-left md:h-[48px] md:w-[97px]"
              />
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <nav
              ref={navRef}
              className="hidden items-center gap-8 text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:flex lg:text-p-nav-lg xl:gap-12 xl:text-p-nav-xl 2xl:text-p-nav-2xl"
            >
              {NAV_LINKS.map((link) => {
                const hasChildren = Boolean(
                  link.children && link.children.length > 0,
                );
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : (link.href !== "#" &&
                        (pathname === link.href ||
                          pathname.startsWith(`${link.href}/`))) ||
                      (hasChildren && pathname.startsWith("/services"));

                const isMenuOpen = hasChildren && openDesktopMenu === link.name;

                return (
                  <div
                    key={link.name}
                    className="relative"
                    onPointerEnter={(event) => {
                      if (!hasChildren || event.pointerType !== "mouse") return;
                      window.clearTimeout(hoverCloseTimerRef.current);
                      openedByRef.current = "hover";
                      setOpenDesktopMenu(link.name);
                    }}
                    onPointerLeave={(event) => {
                      if (!hasChildren || event.pointerType !== "mouse") return;
                      if (openedByRef.current === "click") return;
                      window.clearTimeout(hoverCloseTimerRef.current);
                      hoverCloseTimerRef.current = window.setTimeout(() => {
                        if (openedByRef.current === "click") return;
                        openedByRef.current = null;
                        setOpenDesktopMenu(null);
                      }, 200);
                    }}
                  >
                    {hasChildren ? (
                      <button
                        type="button"
                        aria-expanded={isMenuOpen}
                        aria-haspopup="menu"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          window.clearTimeout(hoverCloseTimerRef.current);
                          if (
                            openedByRef.current === "click" &&
                            openDesktopMenu === link.name
                          ) {
                            openedByRef.current = null;
                            setOpenDesktopMenu(null);
                            return;
                          }
                          openedByRef.current = "click";
                          setOpenDesktopMenu(link.name);
                        }}
                        className={`relative inline-flex items-center gap-1 transition-colors duration-200 ${isActive
                            ? "text-[#1A1B21]"
                            : "text-[#3B494B] hover:text-[#1A1B21]"
                          }`}
                      >
                        <span className="relative inline-block">
                          {link.name}
                          {isActive && (
                            <div className="absolute -bottom-1 left-0 right-0">
                              <HeaderBorderStyle className="h-1.5 w-full" />
                            </div>
                          )}
                        </span>
                        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`} />
                      </button>
                    ) : (
                    <Link
                      href={link.href}
                      className={`relative inline-flex items-center gap-1 transition-colors duration-200 ${isActive
                          ? "text-[#1A1B21]"
                          : "text-[#3B494B] hover:text-[#1A1B21]"
                        }`}
                    >
                      <span className={`relative inline-block${link.href === "/contact" ? " capitalize" : ""}`}>
                        {link.name}
                        {isActive && (
                          <div className="absolute -bottom-1 left-0 right-0">
                            <HeaderBorderStyle className="h-1.5 w-full" />
                          </div>
                        )}
                      </span>
                    </Link>
                    )}

                    {hasChildren && (
                      <div
                        className={`absolute top-full left-0 z-50 w-72 pt-3 transition-all duration-200 ease-out ${
                          isMenuOpen
                            ? "visible translate-y-0 opacity-100"
                            : "pointer-events-none invisible translate-y-1 opacity-0"
                        }`}
                      >
                        <div className="flex flex-col gap-1 rounded-global border border-gray-100 bg-white/95 p-2 shadow-[0_4px_24px_0_rgba(0,0,0,0.1)] backdrop-blur-md">
                          {link.children?.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                              <Link   
                                key={child.title}
                                href={child.href}
                                onClick={() => {
                                  setOpenDesktopMenu(null);
                                  openedByRef.current = null;
                                }}
                                className={`rounded-lg px-3 py-2 transition-colors text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl ${isChildActive
                                    ? "text-[#1A1B21] underline"
                                    : "text-[#3B494B] hover:bg-gray-50 hover:text-[#1A1B21]"
                                  }`}
                              >
                                {child.title}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 lg:gap-4 xl:gap-6">
              <div
                className="hidden h-6 w-px bg-[#B9CACB] lg:block"
                aria-hidden="true"
              />
              <div ref={languageRef}>
                <LanguageSwitcher />
              </div>

              <div ref={ctaRef}>
                <Link
                  href="/contact"
                  className="hidden rounded-global bg-global px-4 py-2.5 text-sm font-medium text-white transition-shadow duration-300 hover:shadow-lg sm:rounded-global-sm md:rounded-global-md lg:inline-block lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
                >
                  {t("startProject")}
                </Link>
              </div>

              <button
                className="rounded-lg transition-colors hover:bg-white/50 lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-[#1A1B21]" />
                ) : (
                  <Menu className="h-6 w-6 text-[#1A1B21]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        style={{ opacity: 0, display: "none" }}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl lg:hidden"
        style={{ transform: "translateX(100%)", opacity: 0 }}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-3 py-4">
          <Link
            href="/"
            className={`${geist.className} text-2xl font-extrabold`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
           <img
                src="/schoq-logo.svg?v=2"
                alt="SCHOQ"
                width={120}
                height={60}
                className="h-[40px] w-[81px] object-contain object-left md:h-[48px] md:w-[97px]"
              />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute right-1 top-1 rounded-lg p-2 transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-[#1A1B21]" />
          </button>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto p-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const hasChildren = Boolean(
              link.children && link.children.length > 0,
            );
            const isExpanded = expandedMobileMenu === link.name;

            return (
              <div key={link.name} className="mobile-link">
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => toggleMobileSubmenu(link.name)}
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-colors text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl ${
                      isActive || isExpanded
                        ? "bg-gray-50/80 text-[#1A1B21]"
                        : "text-[#3B494B] hover:bg-gray-50"
                    }`}
                    aria-expanded={isExpanded}
                    aria-label={`Toggle ${link.name} submenu`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`relative block rounded-lg px-4 py-2 transition-colors text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl ${link.href === "/contact" ? "capitalize " : ""}${isActive
                        ? "bg-gray-50/80 text-[#1A1B21]"
                        : "text-[#3B494B] hover:bg-gray-50"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}

                {hasChildren && isExpanded && (
                  <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 pl-2">
                    {link.children?.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        className="block rounded-md px-2 py-2 text-[#3B494B] transition-colors hover:bg-gray-50 hover:text-[#1A1B21] text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="mobile-link mt-6 border-t border-gray-100 pt-4">
            <Link
              href="/contact"
              className="block w-full rounded-global bg-global px-4 py-2.5 text-center font-semibold text-white transition-all duration-300 hover:shadow-lg sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("startProject")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
