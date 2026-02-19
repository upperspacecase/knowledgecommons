"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const pillarImages = {
    land: "/images/pillar-land.png",
    bioregion: "/images/pillar-bioregion.png",
    seasons: "/images/pillar-seasons.png",
};

const pillarLabels = ["Pillar I", "Pillar II", "Pillar III"];

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
                {/* Eyebrow + Headline + Description */}
                <div className="max-w-xl mb-14">
                    <p className="eyebrow text-[var(--color-terracotta)] mb-4">
                        Our Framework
                    </p>
                    <h2 className="headline-lg text-[var(--foreground)] mb-5">
                        {t("title")}
                    </h2>
                    <p className="body-md text-black/50 leading-relaxed">
                        A science-based approach to understanding your land.
                        Our framework combines owner knowledge with open data
                        across three pillars that center nature and place.
                    </p>
                </div>

                {/* Pillar cards — tight-gap photography cards, minimal text */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {pillars.map((key, i) => (
                        <div
                            key={key}
                            className={`content-card overflow-hidden transition-all duration-700 ${visible
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
                                <p className="eyebrow text-[#F5EDE0]/50 mb-2">
                                    {pillarLabels[i]}
                                </p>
                                <h3 className="font-serif text-2xl text-[#F5EDE0]">
                                    {t(`${key}.title`)}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
