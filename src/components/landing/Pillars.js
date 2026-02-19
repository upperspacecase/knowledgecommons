"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const pillarImages = {
    land: "/images/pillar-land.png",
    bioregion: "/images/pillar-bioregion.png",
    seasons: "/images/pillar-seasons.png",
};

export default function Pillars() {
    const t = useTranslations("landing.pillars");
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

    const pillars = ["land", "bioregion", "seasons"];

    return (
        <section
            ref={sectionRef}
            className="section-padding bg-[var(--background)]"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Eyebrow + Headline */}
                <div className="max-w-2xl mb-16">
                    <p className="eyebrow text-black/40 mb-4">
                        Our Framework
                    </p>
                    <h2 className="headline-lg text-[var(--foreground)]">
                        {t("title")}
                    </h2>
                </div>

                {/* Pillar cards — photography-driven */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pillars.map((key, i) => (
                        <div
                            key={key}
                            className={`content-card rounded-2xl overflow-hidden transition-all duration-700 ${visible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                                }`}
                            style={{ transitionDelay: `${i * 150}ms` }}
                        >
                            <img
                                src={pillarImages[key]}
                                alt={t(`${key}.title`)}
                                className="card-image"
                            />
                            <div className="card-overlay" />
                            <div className="card-content">
                                <p className="eyebrow text-white/50 mb-2">
                                    Pillar {i + 1}
                                </p>
                                <h3 className="font-serif text-2xl text-white mb-3">
                                    {t(`${key}.title`)}
                                </h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    {t(`${key}.description`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
