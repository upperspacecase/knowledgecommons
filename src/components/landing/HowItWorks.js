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
        <section
            ref={sectionRef}
            className="section-padding relative"
            style={{ background: "rgba(255,255,255,0.03)" }}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <h2 className="headline-lg text-center mb-20">
                    {t("title")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
                    {/* Connecting line */}
                    <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-white/10" />

                    {steps.map((key, i) => {
                        const Icon = stepIcons[i];
                        return (
                            <div
                                key={key}
                                className={`relative text-center transition-all duration-700 ${visible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                    }`}
                                style={{ transitionDelay: `${i * 200}ms` }}
                            >
                                {/* Step number circle */}
                                <div className="relative z-10 mx-auto mb-8">
                                    <div className="w-20 h-20 rounded-full bg-[var(--background)] border-2 border-white/15 flex items-center justify-center mx-auto">
                                        <Icon
                                            size={28}
                                            className="text-cream"
                                        />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-peach flex items-center justify-center text-xs font-bold text-[var(--background)]">
                                        {i + 1}
                                    </div>
                                </div>

                                <h3 className="font-serif text-xl font-semibold mb-3">
                                    {t(`${key}.title`)}
                                </h3>
                                <p className="text-white/50 body-md max-w-xs mx-auto">
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
