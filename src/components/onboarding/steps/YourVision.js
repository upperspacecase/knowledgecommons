"use client";

import { useTranslations } from "next-intl";

export default function YourVision({ data, updateData }) {
    const t = useTranslations("onboarding.steps.goals");

    return (
        <div className="space-y-8">
            <div>
                <h2 className="font-serif text-3xl font-bold mb-2">
                    {t("title")}
                </h2>
                <p className="text-white/40 text-sm">{t("subtitle")}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                    {t("descriptionLabel")}
                </label>
                <textarea
                    value={data.visionDescription}
                    onChange={(e) =>
                        updateData({ visionDescription: e.target.value })
                    }
                    placeholder={t("descriptionPlaceholder")}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none leading-relaxed"
                />
                <p className="text-xs text-white/20 mt-2">
                    Everything else — soil data, fire history, weather — we&apos;ll pull in automatically.
                </p>
            </div>
        </div>
    );
}
