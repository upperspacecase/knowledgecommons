"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function BottomCTA() {
    const t = useTranslations("landing.cta");

    return (
        <section className="py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden">
                    {/* Green accent block */}
                    <div className="bg-[#6DB86B] p-10 sm:p-14 flex flex-col justify-center">
                        <p className="eyebrow text-black/40 mb-4">
                            Get Started
                        </p>
                        <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] mb-4 leading-tight">
                            {t("title")}
                        </h2>
                        <p className="body-md text-black/60 max-w-md">
                            {t("subtitle")}
                        </p>
                    </div>

                    {/* CTA side */}
                    <div className="bg-[var(--background)] p-10 sm:p-14 flex flex-col justify-center items-start border border-l-0 border-black/8 rounded-r-2xl">
                        <p className="body-md text-black/50 mb-6">
                            Build your property&apos;s living profile
                        </p>
                        <Link
                            href="/contribute"
                            className="btn-cta group"
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
