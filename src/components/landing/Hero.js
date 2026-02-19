"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Hero() {
    const t = useTranslations("landing.hero");

    return (
        <section className="relative min-h-screen flex items-end overflow-hidden">
            {/* Full-bleed background image */}
            <img
                src="/images/hero.png"
                alt="Aerial view of lush green river valley"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/5" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

            {/* Content — bottom-left aligned */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-24 pt-48">
                {/* Headline — large display serif, cream */}
                <h1 className="headline-xl text-[#F5EDE0] mb-32 sm:mb-40 max-w-2xl">
                    {t("headline")}
                </h1>

                {/* Lower content block */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
                    <div className="max-w-lg">
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5EDE0] mb-4 leading-snug">
                            {t("subtitle")}
                        </h2>
                        <p className="body-md text-[#F5EDE0]/70 max-w-md">
                            {t("description")}
                        </p>
                    </div>

                    {/* Single pill-outline CTA — bottom right */}
                    <Link href="/contribute" className="btn-outline-light">
                        {t("cta")}
                    </Link>
                </div>
            </div>
        </section>
    );
}
