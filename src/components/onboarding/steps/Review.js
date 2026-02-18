"use client";

import { useTranslations } from "next-intl";
import { Edit3, MapPin, ChevronRight } from "lucide-react";

const stepNames = [
    "propertyInfo",
    "location",
    "boundaries",
    "landUse",
    "soil",
    "water",
    "floraFauna",
    "fire",
    "challenges",
    "goals",
    "documents",
];

export default function Review({ data, goToStep }) {
    const t = useTranslations("onboarding.steps.review");

    const sections = [
        {
            key: "property",
            step: 0,
            content: data.propertyName
                ? `${data.propertyName} — ${data.ownerName}`
                : "Not provided",
        },
        {
            key: "location",
            step: 1,
            content: data.address || (data.coordinates ? `${data.coordinates.lat.toFixed(4)}, ${data.coordinates.lng.toFixed(4)}` : "Not provided"),
        },
        {
            key: "boundaries",
            step: 2,
            content: data.approximateArea
                ? `${data.approximateArea} ${data.areaUnit}`
                : "Not provided",
        },
        {
            key: "landUse",
            step: 3,
            content: data.landUse?.length
                ? data.landUse.join(", ")
                : "Not provided",
        },
        {
            key: "soil",
            step: 4,
            content: data.soilType || (data.soilTestResults?.length
                ? `${data.soilTestResults.length} file(s) uploaded`
                : "Not provided"),
        },
        {
            key: "water",
            step: 5,
            content: data.waterSources?.length
                ? data.waterSources.map((s) => s.type).join(", ")
                : "Not provided",
        },
        {
            key: "floraFauna",
            step: 6,
            content: [
                ...(data.flora || []),
                ...(data.fauna || []),
            ].length
                ? `${(data.flora || []).length} plants, ${(data.fauna || []).length} animals`
                : "Not provided",
        },
        {
            key: "fire",
            step: 7,
            content: data.fireHistory?.hasHistory
                ? `Fire history: ${data.fireHistory.lastFireYear || "year unknown"} — ${data.fireHistory.preparednessStatus}`
                : "No fire history",
        },
        {
            key: "challenges",
            step: 8,
            content: data.challenges?.length
                ? data.challenges.join(", ")
                : "None selected",
        },
        {
            key: "goals",
            step: 9,
            content: data.goals?.length
                ? data.goals.join(", ")
                : "None selected",
        },
        {
            key: "documents",
            step: 10,
            content: data.documents?.length
                ? `${data.documents.length} document(s)`
                : "No documents",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-serif text-2xl font-bold mb-1">{t("title")}</h2>
                <p className="text-white/50 text-sm">{t("subtitle")}</p>
            </div>

            <div className="space-y-2">
                {sections.map(({ key, step, content }) => (
                    <button
                        key={key}
                        onClick={() => goToStep(step)}
                        className="w-full flex items-center gap-3 glass-card p-4 hover:bg-white/8 transition-colors text-left group"
                    >
                        <div className="flex-1">
                            <p className="text-xs text-white/40 mb-0.5 uppercase tracking-wider">
                                {t(`section.${key}`)}
                            </p>
                            <p className="text-sm text-white/80 capitalize">{content}</p>
                        </div>
                        <Edit3
                            size={14}
                            className="text-white/20 group-hover:text-forest-400 transition-colors shrink-0"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
