"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        const steps = 60;
        const increment = end / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [isVisible, end, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

export default function ImpactMetrics() {
    const t = useTranslations("landing.impact");

    const metrics = [
        { value: 0, label: t("properties") },
        { value: 0, label: t("hectares") },
        { value: 0, label: t("bioregions") },
    ];

    return (
        <section className="section-padding">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <h2 className="headline-lg text-center mb-16">
                    {t("title")}
                </h2>

                {/* Stats row — editorial style with dividers */}
                <div className="flex flex-col md:flex-row items-stretch justify-center">
                    {metrics.map(({ value, label }, i) => (
                        <div
                            key={i}
                            className="flex-1 text-center py-8 md:py-0 impact-stat"
                        >
                            <div className="text-5xl sm:text-6xl font-serif font-bold text-cream mb-3">
                                <AnimatedCounter end={value} />
                            </div>
                            <p className="text-white/40 text-sm uppercase tracking-widest font-medium">
                                {label}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="text-center text-white/30 text-sm mt-12">
                    Be the first to contribute and help build this knowledge
                    base.
                </p>
            </div>
        </section>
    );
}
