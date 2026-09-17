"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

type DiagramNode = {
  id: string;
  title: string;
  desc: string;
};

function NodePill({
  title,
  desc,
  className = "",
}: {
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <div
      className={`w-fit max-w-full rounded-full border border-[#E8EDF5] bg-white px-3 py-1.5 text-left shadow-[0_8px_20px_rgba(15,23,42,0.06)] sm:px-4 sm:py-2 ${className}`}
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#1A1B21] sm:text-[11px]">
        {title}
      </p>
      <p className="text-[8px] leading-tight text-[#8A90A0] sm:text-[10px]">{desc}</p>
    </div>
  );
}

export default function CustomSoftwareHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textHeaderRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("CustomSoftware.Hero");
  const diagramNodes = t.raw("diagram.nodes") as DiagramNode[];
  const node = (id: string) =>
    diagramNodes.find((item) => item.id === id) ?? { id, title: "", desc: "" };

  useGSAP(
    () => {
      const tlOne = gsap.timeline();
      tlOne.from(textHeaderRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "circ.out",
      });
      tlOne.from(
        ctaButtonRef.current,
        {
          yPercent: -120,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "<",
      );
      tlOne.from(
        imageContainerRef.current,
        {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  const orders = node("orders");
  const tasks = node("tasks");
  const customers = node("customers");
  const documents = node("documents");
  const reporting = node("reporting");
  const approvals = node("approvals");

  return (
    <main
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-[4%] pt-[120px] pb-16 font-sans text-slate-900 selection:bg-purple-100 lg:px-[8%]"
    >
      <div className="mx-auto w-full max-w-6xl space-y-3 text-center md:space-y-4 lg:space-y-5 xl:max-w-7xl">
        <div ref={textHeaderRef} className="space-y-3">
          <h3 className="Conversation mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            {t("category")}
          </h3>

          <h1 className="mx-auto uppercase text-heading text-h1 sm:text-h1-sm md:text-h1-md lg:text-h1-lg xl:text-h1-xl 2xl:text-h1-2xl">
            {t("title1")}
            <br />
            {t("title2")}
          </h1>

          <p className="mx-auto max-w-2xl text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
            {t("description")}
          </p>
        </div>

        <div ref={ctaButtonRef} className="pt-2">
          <Link
            href="/contact"
            className="inline-block cursor-pointer bg-global px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:text-base rounded-global sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
          >
            {t("cta")}
          </Link>
        </div>
      </div>

      <div
        ref={imageContainerRef}
        className="relative mx-auto mt-8 w-full max-w-4xl md:mt-16 lg:mt-20 xl:mt-24"
      >
        <div
          role="img"
          aria-label={t("imageAlt")}
          className="relative overflow-hidden rounded-global bg-linear-to-br from-[#F7F9FC] via-white to-[#ECFDF5] px-3 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
        >
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(140px,1.15fr)_minmax(0,1fr)] items-center gap-2 sm:gap-4 md:gap-6">
            <div className="flex flex-col items-start gap-4 sm:gap-6 md:gap-8">
              <NodePill title={orders.title} desc={orders.desc} />
              <NodePill title={tasks.title} desc={tasks.desc} className="ml-3 sm:ml-6" />
              <NodePill title={customers.title} desc={customers.desc} />
            </div>

            <div className="relative mx-auto flex w-full max-w-[280px] overflow-hidden rounded-2xl border border-[#E8EDF5] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] sm:max-w-[320px] md:max-w-[360px]">
              <div className="flex w-7 shrink-0 flex-col gap-2 bg-[#1B2430] px-1.5 py-3 sm:w-9 sm:px-2 sm:py-4">
                <div className="mx-auto mb-2 flex flex-col gap-0.5">
                  <span className="block h-0.5 w-3 rounded-full bg-white/70 sm:w-4" />
                  <span className="block h-0.5 w-3 rounded-full bg-white/70 sm:w-4" />
                  <span className="block h-0.5 w-3 rounded-full bg-white/70 sm:w-4" />
                </div>
                {Array.from({ length: 4 }).map((_, index) => (
                  <span
                    key={index}
                    className="mx-auto block h-1 w-3 rounded-full bg-white/25 sm:w-4"
                  />
                ))}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-4">
                <div className="h-1.5 w-10 rounded-full bg-[#575EE3]" />
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { value: "24", bar: "bg-[#575EE3]" },
                    { value: "08", bar: "bg-[#56D59A]" },
                    { value: "16", bar: "bg-[#575EE3]" },
                  ].map((metric) => (
                    <div
                      key={metric.value}
                      className="rounded-xl border border-[#EEF1F6] bg-[#F8FAFC] px-1.5 py-2 text-center sm:px-2 sm:py-3"
                    >
                      <p className="text-sm font-semibold text-[#1A1B21] sm:text-lg md:text-xl">
                        {metric.value}
                      </p>
                      <span className={`mt-2 block h-0.5 w-full rounded-full ${metric.bar}`} />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {Array.from({ length: 2 }).map((_, card) => (
                    <div
                      key={card}
                      className="space-y-2 rounded-xl border border-[#EEF1F6] bg-[#F8FAFC] p-2 sm:p-3"
                    >
                      {Array.from({ length: 3 }).map((_, row) => (
                        <div key={row} className="flex items-center justify-between gap-2">
                          <span className="h-1 flex-1 rounded-full bg-[#D7DCE5]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-[#56D59A]" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 sm:gap-6 md:gap-8">
              <NodePill title={documents.title} desc={documents.desc} />
              <NodePill title={reporting.title} desc={reporting.desc} className="mr-3 sm:mr-6" />
              <NodePill title={approvals.title} desc={approvals.desc} />
            </div>
          </div>

          <div className="mt-6 flex justify-center sm:mt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8EDF5] bg-white px-3 py-1.5 shadow-[0_8px_20px_rgba(15,23,42,0.06)] sm:px-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#56D59A]" />
              <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#1A1B21] sm:text-[11px]">
                {t("diagram.badge")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
