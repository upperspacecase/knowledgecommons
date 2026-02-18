"use client";

import { useTranslations } from "next-intl";

export default function PropertyInfo({ data, updateData }) {
    const t = useTranslations("onboarding.steps.propertyInfo");

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-serif text-2xl font-bold mb-1">{t("title")}</h2>
                <p className="text-white/50 text-sm">{t("subtitle")}</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                        {t("propertyName")} <span className="text-ember-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.propertyName}
                        onChange={(e) => updateData({ propertyName: e.target.value })}
                        placeholder={t("propertyNamePlaceholder")}
                        className="input input-bordered w-full bg-white/5 border-white/10 focus:border-forest-500 text-white placeholder:text-white/30"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                        {t("ownerName")} <span className="text-ember-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.ownerName}
                        onChange={(e) => updateData({ ownerName: e.target.value })}
                        placeholder={t("ownerNamePlaceholder")}
                        className="input input-bordered w-full bg-white/5 border-white/10 focus:border-forest-500 text-white placeholder:text-white/30"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                        {t("ownerEmail")}
                    </label>
                    <input
                        type="email"
                        value={data.ownerEmail}
                        onChange={(e) => updateData({ ownerEmail: e.target.value })}
                        placeholder={t("ownerEmailPlaceholder")}
                        className="input input-bordered w-full bg-white/5 border-white/10 focus:border-forest-500 text-white placeholder:text-white/30"
                    />
                    <p className="text-xs text-white/30 mt-1">{t("ownerEmailHelp")}</p>
                </div>
            </div>
        </div>
    );
}
