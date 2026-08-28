import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface Message {
  description: string;
  buttonText: string;
}

export default async function FooterMessage({
  description,
  buttonText,
}: Message) {
  const t = await getTranslations("Layout.FooterMessage");
  return (
    <section className="min-h-[40vh] md:min-h-[80vh] bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-400 text-foreground relative flex items-center justify-center px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Quote in italic, bold white typography */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold italic leading-tight tracking-tight text-white mb-6 md:mb-8">
          &quot;{t("quote1")}
          <br />
          {t("quote2")}
          <br />
          {t("quote3")}&quot;
        </h1>

        {/* Challenge subtitle stacked vertically above the button */}
        <p className="text-base sm:text-lg md:text-xl font-medium text-white/90 mb-6">
          {description}
        </p>

        {/* Glassmorphism translucent rounded pill button */}
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all duration-300 shadow-sm cursor-pointer"
        >
          {buttonText}
          <span className="text-lg leading-none">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
