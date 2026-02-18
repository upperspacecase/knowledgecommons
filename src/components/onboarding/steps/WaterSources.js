"use client";

import { useTranslations } from "next-intl";
import { Droplets, Waves, CloudRain, Pipette, Droplet, HelpCircle, X } from "lucide-react";

const icons = {
    well: Droplets,
    river: Waves,
    spring: Droplet,
    rainwater: CloudRain,
    irrigation: Pipette,
    other: HelpCircle,
};

const types = ["well", "river", "spring", "rainwater", "irrigation", "other"];

export default function WaterSources({ data, updateData }) {
    const t = useTranslations("onboarding.steps.water");

    const toggleSource = (type) => {
        const current = data.waterSources || [];
        const exists = current.find((s) => s.type === type);
        const updated = exists
            ? current.filter((s) => s.type !== type)
            : [...current, { type, description: "" }];
        updateData({ waterSources: updated });
    };

    const updateDescription = (type, description) => {
        const updated = (data.waterSources || []).map((s) =>
            s.type === type ? { ...s, description } : s
        );
        updateData({ waterSources: updated });
    };

    const selectedTypes = (data.waterSources || []).map((s) => s.type);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-serif text-2xl font-bold mb-1">{t("title")}</h2>
                <p className="text-white/50 text-sm">{t("subtitle")}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {types.map((type) => {
                    const Icon = icons[type];
                    const selected = selectedTypes.includes(type);
                    return (
                        <button
                            key={type}
                            onClick={() => toggleSource(type)}
                            className={`p-4 rounded-xl border text-center transition-all duration-200 ${selected
                                    ? "bg-ocean-600/20 border-ocean-500/50 text-ocean-400"
                                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/8 hover:border-white/20"
                                }`}
                        >
                            <Icon size={24} className="mx-auto mb-2" />
                            <span className="text-sm font-medium">{t(`types.${type}`)}</span>
                        </button>
                    );
                })}
            </div>

            {/* Description for selected sources */}
            {(data.waterSources || []).map((source) => (
                <div key={source.type} className="glass-card p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-ocean-400">
                            {t(`types.${source.type}`)}
                        </span>
                        <button
                            onClick={() => toggleSource(source.type)}
                            className="p-1 rounded hover:bg-white/10"
                        >
                            <X size={14} className="text-white/30" />
                        </button>
                    </div>
                    <textarea
                        value={source.description}
                        onChange={(e) => updateDescription(source.type, e.target.value)}
                        placeholder={t("descriptionPlaceholder")}
                        rows={2}
                        className="textarea textarea-bordered w-full bg-white/5 border-white/10 focus:border-ocean-500 text-white placeholder:text-white/30 text-sm"
                    />
                </div>
            ))}
        </div>
    );
}
