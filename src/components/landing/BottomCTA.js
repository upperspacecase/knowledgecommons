"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function BottomCTA() {
    const t = useTranslations("landing.cta");

    return (
        <section className="relative overflow-hidden">
            {/* Subtle topographic background lines */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 200 Q100 150 200 180 Q300 210 350 160' fill='none' stroke='%236DB86B' stroke-width='1.5'/%3E%3Cpath d='M30 250 Q120 200 220 230 Q320 260 380 210' fill='none' stroke='%236DB86B' stroke-width='1'/%3E%3Cpath d='M60 300 Q140 260 240 280 Q340 300 390 270' fill='none' stroke='%236DB86B' stroke-width='1'/%3E%3Cpath d='M20 140 Q80 100 180 120 Q280 140 360 100' fill='none' stroke='%236DB86B' stroke-width='1'/%3E%3Cpath d='M40 80 Q100 50 200 70 Q300 90 370 50' fill='none' stroke='%236DB86B' stroke-width='1.5'/%3E%3C/svg%3E")`,
                    backgroundSize: "400px 400px",
                }}
            />

            {/* Centered pill-outline button */}
            <div className="text-center py-12">
                <Link href="/directory" className="btn-outline-dark">
                    Explore the Directory
                </Link>
            </div>

            {/* Thin divider */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="border-t border-black/10" />
            </div>

            {/* Main CTA block */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
                    {/* Green card — left 3 cols */}
                    <div className="md:col-span-3 bg-[#6DB86B] rounded-xl p-10 sm:p-14">
                        <p className="eyebrow text-black/40 mb-4">
                            Get Started
                        </p>
                        <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] mb-5 leading-tight">
                            {t("title")}
                        </h2>
                        <p className="body-md text-black/60 max-w-md">
                            {t("subtitle")}
                        </p>
                    </div>

                    {/* Right side — text + underlined link */}
                    <div className="md:col-span-2 flex flex-col justify-center py-4 md:py-10">
                        <p className="body-md text-black/50 mb-6">
                            Build your property&apos;s living profile
                        </p>
                        <Link
                            href="/contribute"
                            className="inline-flex items-center gap-2 text-[var(--foreground)] font-medium underline underline-offset-4 decoration-1 hover:decoration-2 transition-all group"
                        >
                            {t("button")}
                            <ArrowRight
                                size={16}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
