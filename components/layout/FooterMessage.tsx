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
    <section className="min-h-[40vh] md:min-h-[80vh] bg-global text-foreground relative flex items-center justify-center px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Quote in italic, bold white typography */}
        <h1 className="mb-6 font-bold italic text-white leading-[1.2] md:leading-[1.1] tracking-tight text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl 2xl:text-h2-2xl md:mb-8">
          &quot;{t("quote1")}
          <br />
          {t("quote2")}
          <br />
          {t("quote3")}&quot;
        </h1>

        {/* Challenge subtitle stacked vertically above the button */}
        <p className="text-p sm:text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl 2xl:text-p-2xl font-medium text-white/90 mb-6">
          {description}
        </p>

        {/* Glassmorphism translucent rounded pill button */}
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-global bg-white/20 hover:bg-white/30 border border-white/30 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all duration-300 shadow-sm cursor-pointer sm:rounded-global-sm md:rounded-global-md lg:rounded-global-lg xl:rounded-global-xl 2xl:rounded-global-2xl"
        >
          {buttonText}
          <span className="text-lg leading-none">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
