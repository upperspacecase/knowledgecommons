"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function BottomCTA() {
    const t = useTranslations("landing.cta");

    return (
        <section className="relative py-24 sm:py-32 overflow-hidden">
            {/* Background — dark forest with texture */}
            <div className="absolute inset-0 bg-forest-900" />
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url(/images/pillar-land.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(3px)',
            }} />
            <div className="absolute inset-0 bg-gradient-to-b from-forest-900/90 to-forest-900/95" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                <h2 className="headline-lg text-cream mb-6">
                    {t("title")}
                </h2>
                <p className="body-lg text-white/60 max-w-2xl mx-auto mb-10">
                    {t("subtitle")}
                </p>
                <Link href="/contribute" className="btn-cta group text-base">
                    {t("button")}
                    <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                </Link>
            </div>
        </section>
    );
}
