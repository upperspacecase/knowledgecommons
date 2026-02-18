"use client";

import { useTranslations } from "next-intl";
import { Flame, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

export default function FireHistory({ data, updateData }) {
    const t = useTranslations("onboarding.steps.fire");
    const fire = data.fireHistory || {
        hasHistory: false,
        description: "",
        lastFireYear: "",
        preparednessStatus: "unprepared",
    };

    const update = (updates) => {
        updateData({ fireHistory: { ...fire, ...updates } });
    };

    const preparednessOptions = [
        { value: "prepared", icon: ShieldCheck, color: "text-forest-400 border-forest-500/50 bg-forest-700/20" },
        { value: "partially", icon: ShieldAlert, color: "text-earth-400 border-earth-400/50 bg-earth-500/20" },
        { value: "unprepared", icon: ShieldX, color: "text-ember-500 border-ember-500/50 bg-ember-500/20" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-serif text-2xl font-bold mb-1">{t("title")}</h2>
                <p className="text-white/50 text-sm">{t("subtitle")}</p>
            </div>

            {/* Fire history toggle */}
            <div className="flex gap-3">
                <button
                    onClick={() => update({ hasHistory: true })}
                    className={`flex-1 p-4 rounded-xl border transition-all ${fire.hasHistory
                            ? "bg-ember-500/20 border-ember-500/50 text-ember-500"
                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/8"
                        }`}
                >
                    <Flame size={24} className="mx-auto mb-2" />
                    <span className="text-sm font-medium">{t("hasHistory")}</span>
                </button>
                <button
                    onClick={() => update({ hasHistory: false })}
                    className={`flex-1 p-4 rounded-xl border transition-all ${!fire.hasHistory
                            ? "bg-forest-700/20 border-forest-500/50 text-forest-400"
                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/8"
                        }`}
                >
                    <ShieldCheck size={24} className="mx-auto mb-2" />
                    <span className="text-sm font-medium">{t("noHistory")}</span>
                </button>
            </div>

            {fire.hasHistory && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1.5">
                            {t("lastFireYear")}
                        </label>
                        <input
                            type="number"
                            value={fire.lastFireYear}
                            onChange={(e) => update({ lastFireYear: e.target.value })}
                            placeholder="e.g. 2017"
                            min="1900"
                            max={new Date().getFullYear()}
                            className="input input-bordered w-full bg-white/5 border-white/10 focus:border-forest-500 text-white placeholder:text-white/30"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1.5">
                            {t("description")}
                        </label>
                        <textarea
                            value={fire.description}
                            onChange={(e) => update({ description: e.target.value })}
                            placeholder={t("descriptionPlaceholder")}
                            rows={3}
                            className="textarea textarea-bordered w-full bg-white/5 border-white/10 focus:border-forest-500 text-white placeholder:text-white/30"
                        />
                    </div>
                </div>
            )}

            {/* Preparedness */}
            <div>
                <label className="block text-sm font-medium text-white/70 mb-3">
                    {t("preparedness")}
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {preparednessOptions.map(({ value, icon: Icon, color }) => (
                        <button
                            key={value}
                            onClick={() => update({ preparednessStatus: value })}
                            className={`p-3 rounded-xl border text-center transition-all text-sm font-medium ${fire.preparednessStatus === value
                                    ? color
                                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/8"
                                }`}
                        >
                            <Icon size={20} className="mx-auto mb-1.5" />
                            {t(value)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
