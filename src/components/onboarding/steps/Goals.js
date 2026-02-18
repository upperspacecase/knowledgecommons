"use client";

import { useTranslations } from "next-intl";
import {
    TreeDeciduous,
    Sprout,
    BadgeDollarSign,
    RefreshCw,
    Tent,
    GraduationCap,
    HelpCircle,
} from "lucide-react";

const icons = {
    conservation: TreeDeciduous,
    agriculture: Sprout,
    sale: BadgeDollarSign,
    regeneration: RefreshCw,
    tourism: Tent,
    education: GraduationCap,
    other: HelpCircle,
};

const types = [
    "conservation",
    "agriculture",
    "sale",
    "regeneration",
    "tourism",
    "education",
    "other",
];

export default function Goals({ data, updateData }) {
    const t = useTranslations("onboarding.steps.goals");

    const toggleGoal = (type) => {
        const current = data.goals || [];
        const updated = current.includes(type)
            ? current.filter((t) => t !== type)
            : [...current, type];
        updateData({ goals: updated });
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
                    const selected = (data.goals || []).includes(type);
                    return (
                        <button
                            key={type}
                            onClick={() => toggleGoal(type)}
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
                    value={data.goalDescription}
                    onChange={(e) => updateData({ goalDescription: e.target.value })}
                    placeholder={t("descriptionPlaceholder")}
                    rows={3}
                    className="textarea textarea-bordered w-full bg-white/5 border-white/10 focus:border-forest-500 text-white placeholder:text-white/30"
                />
            </div>
        </div>
    );
}
