"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ClipboardList, Satellite, FileCheck } from "lucide-react";

const stepIcons = [ClipboardList, Satellite, FileCheck];

export default function HowItWorks() {
    const t = useTranslations("landing.howItWorks");
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const steps = ["step1", "step2", "step3"];

    return (
        <section ref={sectionRef} className="section-padding">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Eyebrow + Headline */}
                <div className="max-w-2xl mb-16">
                    <p className="eyebrow text-[var(--color-terracotta)] mb-4">
                        How It Works
                    </p>
                    <h2 className="headline-lg text-[var(--foreground)]">
                        {t("title")}
                    </h2>
                </div>

                {/* Editorial bordered cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((key, i) => {
                        const Icon = stepIcons[i];
                        return (
                            <div
                                key={key}
                                className={`editorial-card relative transition-all duration-700 ${visible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                                    }`}
                                style={{ transitionDelay: `${i * 150}ms` }}
                            >
                                {/* Step number + icon */}
                                <div className="flex items-start justify-between mb-6">
                                    <span className="font-serif text-4xl text-black/10">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <Icon
                                        size={28}
                                        strokeWidth={1.5}
                                        className="text-[var(--color-green-accent)]"
                                    />
                                </div>

                                <h3 className="font-serif text-xl text-[var(--foreground)] mb-3">
                                    {t(`${key}.title`)}
                                </h3>
                                <p className="body-md text-black/50">
                                    {t(`${key}.description`)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
