"use client";

import { useTranslations } from "next-intl";
import { Edit3 } from "lucide-react";

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
            content: data.address
                ? data.address
                : data.coordinates
                    ? `${data.coordinates.lat.toFixed(4)}, ${data.coordinates.lng.toFixed(4)}`
                    : "Not provided",
        },
        {
            key: "boundaries",
            step: 1,
            content: data.approximateArea
                ? `${data.approximateArea} ${data.areaUnit}`
                : "Not provided",
        },
        {
            key: "landUse",
            step: 2,
            content: data.landUse?.length
                ? data.landUse.join(", ")
                : "Not selected",
        },
        {
            key: "water",
            step: 2,
            content: data.waterSources?.length
                ? data.waterSources.map((s) => s.type).join(", ")
                : "Not selected",
        },
        {
            key: "goals",
            step: 3,
            content: data.visionDescription
                ? data.visionDescription.substring(0, 80) +
                (data.visionDescription.length > 80 ? "..." : "")
                : "Not provided",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="font-serif text-3xl font-bold mb-2 text-white">
                    {t("title")}
                </h2>
                <p className="text-white/40 text-sm">{t("subtitle")}</p>
            </div>

            <div className="space-y-2">
                {sections.map(({ key, step, content }) => (
                    <button
                        key={key}
                        onClick={() => goToStep(step)}
                        className="w-full flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl p-4 hover:bg-white/8 transition-colors text-left group"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-white/30 mb-0.5 uppercase tracking-wider">
                                {t(`section.${key}`)}
                            </p>
                            <p className="text-sm text-white/70 capitalize truncate">
                                {content}
                            </p>
                        </div>
                        <Edit3
                            size={14}
                            className="text-white/15 group-hover:text-white/40 transition-colors shrink-0"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
