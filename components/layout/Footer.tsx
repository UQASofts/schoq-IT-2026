import React from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

const Footer: React.FC = async () => {
  const t = await getTranslations("Layout.Footer");

  return (
    <footer className="w-full bg-white text-black border-t border-[#D9D9D9] px-[4%] py-8 md:px-[8.61%] md:py-16 lg:py-12">
      <div className="max-w-6xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="space-y-4 lg:max-w-md">
            <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-[#4A4CE6] via-[#34A1B4] to-[#4BE191] bg-clip-text text-transparent transition-transform">
              SCHOQ
            </h2>
            <p className="max-w-md text-gray-600 text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl">
              {t("description")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:contents">
            <div>
              <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4">
                {t("quickLinksHeading")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 transition-colors hover:text-black text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl"
                  >
                    {t("links.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-500 transition-colors hover:text-black text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl"
                  >
                    {t("links.aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="capitalize text-gray-500 transition-colors hover:text-black text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl"
                  >
                    {t("links.contactUs")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/impressum"
                    className="capitalize text-gray-500 transition-colors hover:text-black text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl"
                  >
                    {t("links.imprint")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-black uppercase tracking-wider mb-4">
                {t("contactHeading")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@schoq.com"
                    className="flex items-center gap-3 text-gray-500 transition-colors hover:text-black text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>info@schoq.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+4917622569816"
                    className="flex items-center gap-3 text-gray-500 transition-colors hover:text-black text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>+49 176 22569816</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10">
          <p className="text-center text-gray-500 text-p-nav sm:text-p-nav-sm md:text-p-nav-md lg:text-p-nav-lg xl:text-p-nav-xl 2xl:text-p-nav-2xl">
            © {new Date().getFullYear()} Schoq IT Solutions. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
