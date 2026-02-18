"use client";

import { useTranslations } from "next-intl";

export default function Boundaries({ data, updateData }) {
    const t = useTranslations("onboarding.steps.boundaries");

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-serif text-2xl font-bold mb-1">{t("title")}</h2>
                <p className="text-white/50 text-sm">{t("subtitle")}</p>
            </div>

            <div className="glass-card p-6 space-y-4">
                <h3 className="text-sm font-medium text-white/70">{t("areaOption")}</h3>
                <div className="flex gap-3 items-end">
                    <div className="flex-1">
                        <input
                            type="number"
                            value={data.approximateArea}
                            onChange={(e) => updateData({ approximateArea: e.target.value })}
                            placeholder={t("areaPlaceholder")}
                            className="input input-bordered w-full bg-white/5 border-white/10 focus:border-forest-500 text-white placeholder:text-white/30"
                        />
                    </div>
                    <select
                        value={data.areaUnit}
                        onChange={(e) => updateData({ areaUnit: e.target.value })}
                        className="select select-bordered bg-white/5 border-white/10 text-white"
                    >
                        <option value="hectares">Hectares</option>
                        <option value="acres">Acres</option>
                    </select>
                </div>
            </div>

            <p className="text-xs text-white/30 text-center">
                {t("skipDraw")}
            </p>
        </div>
    );
}
