"use client";

import { useTranslations } from "next-intl";
import { Sprout, Trees, Tractor, Apple, Layers, HelpCircle } from "lucide-react";

const icons = {
    crops: Sprout,
    forest: Trees,
    pasture: Tractor,
    orchard: Apple,
    mixed: Layers,
    other: HelpCircle,
};

const types = ["crops", "forest", "pasture", "orchard", "mixed", "other"];

export default function LandUse({ data, updateData }) {
    const t = useTranslations("onboarding.steps.landUse");

    const toggleType = (type) => {
        const current = data.landUse || [];
        const updated = current.includes(type)
            ? current.filter((t) => t !== type)
            : [...current, type];
        updateData({ landUse: updated });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-serif text-2xl font-bold mb-1">{t("title")}</h2>
                <p className="text-white/50 text-sm">{t("subtitle")}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {types.map((type) => {
                    const Icon = icons[type];
                    const selected = (data.landUse || []).includes(type);
                    return (
                        <button
                            key={type}
                            onClick={() => toggleType(type)}
                            className={`p-4 rounded-xl border text-center transition-all duration-200 ${selected
                                    ? "bg-forest-700/20 border-forest-500/50 text-forest-400"
                                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/8 hover:border-white/20"
                                }`}
                        >
                            <Icon size={24} className="mx-auto mb-2" />
                            <span className="text-sm font-medium">{t(`types.${type}`)}</span>
                        </button>
                    );
                })}
            </div>

            <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                    {t("descriptionLabel")}
                </label>
                <textarea
                    value={data.landUseDescription}
                    onChange={(e) => updateData({ landUseDescription: e.target.value })}
                    placeholder={t("descriptionPlaceholder")}
                    rows={3}
                    className="textarea textarea-bordered w-full bg-white/5 border-white/10 focus:border-forest-500 text-white placeholder:text-white/30"
                />
            </div>
        </div>
    );
}
