import React from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

const Footer: React.FC = async () => {
  const t = await getTranslations("Layout.Footer");

  return (
    <footer className="w-full bg-white text-black px-6 py-12 md:px-12 lg:px-20 md:py-16 lg:py-12 border-t border-[#D9D9D9] ">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-[#4A4CE6] via-[#34A1B4] to-[#4BE191] bg-clip-text text-transparent transition-transform">
              SCHOQ
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4">
              {t("quickLinksHeading")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm md:text-base text-gray-500 hover:text-black transition-colors"
                >
                  {t("links.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm md:text-base text-gray-500 hover:text-black transition-colors"
                >
                  {t("links.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm md:text-base text-gray-500 hover:text-black transition-colors"
                >
                  {t("links.contactUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm md:text-base text-gray-500 hover:text-black transition-colors"
                >
                  {t("links.imprint")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-black uppercase tracking-wider mb-4">
              {t("contactHeading")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@schoq.com"
                  className="flex items-center gap-3 text-sm md:text-base text-gray-500 hover:text-black transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>info@schoq.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+4917622569816"
                  className="flex items-center gap-3 text-sm md:text-base text-gray-500 hover:text-black transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>+49 176 22569816</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Schoq IT Solutions. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
