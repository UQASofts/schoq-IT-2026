"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

type DetailRow = {
  label: string;
  value: string;
};

type ExtraSection = {
  number: string;
  title: string;
  body: string;
  link?: string;
  href?: string;
  note?: string;
};

export default function LegalInformation() {
  const t = useTranslations("Impressum.Legal");
  const officeLines = t.raw("sidebar.registeredOffice") as string[];
  const registerLines = t.raw("sidebar.register") as string[];
  const directors = t.raw("sidebar.directors") as string[];
  const details = t.raw("details") as DetailRow[];
  const founders = t.raw("founders") as string[];
  const extraSections = t.raw("extraSections") as ExtraSection[];
  const email = t("sidebar.email");
  const phone = t("sidebar.phone");

  return (
    <section className="bg-[#F9FAFB] px-[4%] md:px-[8.16%] py-global sm:py-global-sm md:py-global-md lg:px-[8%] lg:py-global-lg xl:py-global-xl 2xl:py-global-2xl">
      <div className="mx-auto grid w-full grid-cols-1 gap-10 lg:grid-cols-[minmax(260px,320px)_1fr] lg:gap-14 xl:gap-16">
        <aside
          className="relative h-fit overflow-hidden rounded-[24px] border border-[#DCE5E7] bg-white p-6 lg:sticky lg:top-32"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(79, 98, 238, 0.07) 0%, rgba(68, 169, 210, 0.05) 50%, rgba(88, 215, 163, 0.09) 100%)",
          }}
        >
          <div className="relative space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              {t("sidebar.label")}
            </p>
            <h2
              translate="no"
              className="text-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg"
            >
              {t("sidebar.company")}
            </h2>

            <div className="divide-y divide-black/10">
              <div className="py-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  {t("sidebar.registeredOfficeLabel")}
                </p>
                <p className="text-heading text-p sm:text-p-sm md:text-p-md">
                  {officeLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div className="py-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  {t("sidebar.registerLabel")}
                </p>
                <p className="text-heading text-p sm:text-p-sm md:text-p-md">
                  {registerLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div className="py-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  {t("sidebar.directorsLabel")}
                </p>
                <p className="text-heading text-p sm:text-p-sm md:text-p-md">
                  {directors.map((name) => (
                    <span key={name} translate="no" className="block">
                      {name}
                    </span>
                  ))}
                </p>
              </div>

              <div className="py-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  {t("sidebar.emailLabel")}
                </p>
                <a
                  href={`mailto:${email}`}
                  className="text-heading text-p sm:text-p-sm md:text-p-md hover:opacity-70"
                >
                  {email}
                </a>
              </div>

              <div className="py-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  {t("sidebar.phoneLabel")}
                </p>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-heading text-p sm:text-p-sm md:text-p-md hover:opacity-70"
                >
                  {phone}
                </a>
              </div>
            </div>

            <p className="pt-2 text-neutral-400 text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl">
              {t("sidebar.footer")}
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            {t("headingLabel")}
          </p>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="uppercase text-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl">
              {t("title")}
            </h2>
            <p className="shrink-0 text-neutral-400 text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl sm:pb-1">
              {t("notice")}
            </p>
          </div>

          <div className="mt-6 h-px w-full bg-black/10" />

          <div className="mt-8 grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 sm:gap-x-6">
            <span className="bg-global bg-clip-text pt-1 text-xs font-semibold text-transparent">
              {t("sectionNumber")}
            </span>
            <div>
              <h3 className="text-heading text-h3 sm:text-h3-sm md:text-h3-md lg:text-h3-lg xl:text-h3-xl 2xl:text-h3-2xl">
                {t("sectionTitle")}
              </h3>
              <p
                translate="no"
                className="mt-4 font-semibold text-heading text-p sm:text-p-sm md:text-p-md lg:text-p-lg"
              >
                {t("companyName")}
              </p>

              <dl className="mt-6 divide-y divide-black/10">
                {details.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6"
                  >
                    <dt className="font-medium text-neutral-500 text-p sm:text-p-sm md:text-p-md">
                      {row.label}
                    </dt>
                    <dd
                      translate="no"
                      className="text-heading text-p sm:text-p-sm md:text-p-md lg:text-p-lg"
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {founders.map((name) => (
                  <div
                    key={name}
                    className="rounded-global border border-black/5 bg-white px-5 py-4 sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      {t("founderLabel")}
                    </p>
                    <p
                      translate="no"
                      className="mt-2 font-semibold text-heading text-p sm:text-p-sm md:text-p-md lg:text-p-lg"
                    >
                      {name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-heading text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl hover:border-black/20"
                >
                  {email}
                </a>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-heading text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl hover:border-black/20"
                >
                  {phone}
                </a>
              </div>
            </div>
          </div>

          {extraSections.map((section) => (
            <div key={section.number}>
              <div className="mt-8 h-px w-full bg-black/10" />
              <div className="mt-8 grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-6">
                <span className="bg-global bg-clip-text pt-1 text-xs font-semibold text-transparent">
                  {section.number}
                </span>
                <div>
                  <h3 className="text-heading text-h3 sm:text-h3-sm md:text-h3-md lg:text-h3-lg xl:text-h3-xl 2xl:text-h3-2xl">
                    {section.title}
                  </h3>
                  <p className="mt-4 text-neutral-500 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
                    {section.body}
                  </p>
                  {section.link && section.href && (
                    <Link
                      href="#"
                      className="mt-4 inline-block bg-global bg-clip-text font-semibold text-transparent text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl hover:opacity-80"
                    >
                      {section.link}
                    </Link>
                  )}
                  {section.note && (
                    <div className="mt-6 rounded-global border border-black/10 bg-[#F2F5F7] px-5 py-4 text-neutral-500 text-p-nav sm:rounded-global-sm sm:text-p-nav-sm md:rounded-global-md md:text-p-nav-md lg:rounded-global-lg lg:text-p-nav-lg xl:rounded-global-xl xl:text-p-nav-xl 2xl:rounded-global-2xl 2xl:text-p-nav-2xl">
                      {section.note}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
