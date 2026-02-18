"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            {/* Content — bottom-left aligned like One Earth */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-24 pt-48">
                <div className="max-w-2xl">
                    {/* Headline */}
                    <h1 className="headline-xl text-white mb-6">
                        {t("headline")}
                    </h1>

                    {/* Subtitle */}
                    <p className="body-lg text-white/80 mb-4 max-w-xl">
                        {t("subtitle")}
                    </p>

                    {/* Description */}
                    <p className="body-md text-white/60 mb-10 max-w-lg">
                        {t("description")}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <Link href="/contribute" className="btn-cta group">
                            {t("cta")}
                            <ArrowRight
                                size={16}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                        <Link href="/directory" className="btn-outline-light">
                            {t("ctaSecondary")}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
