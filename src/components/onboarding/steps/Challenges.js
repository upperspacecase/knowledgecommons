"use client";

import { useTranslations } from "next-intl";
import {
    Mountain,
    CloudDrizzle,
    Bug,
    Flame,
    Waves,
    TreeDeciduous,
    HelpCircle,
} from "lucide-react";

const icons = {
    erosion: Mountain,
    drought: CloudDrizzle,
    pests: Bug,
    fire_risk: Flame,
    flooding: Waves,
    invasive_species: TreeDeciduous,
    other: HelpCircle,
};

const types = [
    "erosion",
    "drought",
    "pests",
    "fire_risk",
    "flooding",
    "invasive_species",
    "other",
];

export default function Challenges({ data, updateData }) {
    const t = useTranslations("onboarding.steps.challenges");

    const toggleChallenge = (type) => {
        const current = data.challenges || [];
        const updated = current.includes(type)
            ? current.filter((t) => t !== type)
            : [...current, type];
        updateData({ challenges: updated });
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
                    const selected = (data.challenges || []).includes(type);
                    return (
                        <button
                            key={type}
                            onClick={() => toggleChallenge(type)}
                            className={`p-4 rounded-xl border text-center transition-all duration-200 ${selected
                                    ? "bg-ember-500/20 border-ember-500/50 text-ember-500"
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
                    value={data.challengeDescription}
                    onChange={(e) => updateData({ challengeDescription: e.target.value })}
                    placeholder={t("descriptionPlaceholder")}
                    rows={3}
                    className="textarea textarea-bordered w-full bg-white/5 border-white/10 focus:border-forest-500 text-white placeholder:text-white/30"
                />
            </div>
        </div>
    );
}
