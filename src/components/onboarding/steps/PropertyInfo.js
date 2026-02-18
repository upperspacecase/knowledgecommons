"use client";

import { useTranslations } from "next-intl";

export default function PropertyInfo({ data, updateData }) {
    const t = useTranslations("onboarding.steps.propertyInfo");

    return (
        <div className="space-y-8">
            <div>
                <h2 className="font-serif text-3xl font-bold mb-2">
                    {t("title")}
                </h2>
                <p className="text-white/40 text-sm">{t("subtitle")}</p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                        {t("propertyName")}{" "}
                        <span className="text-white/30">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.propertyName}
                        onChange={(e) =>
                            updateData({ propertyName: e.target.value })
                        }
                        placeholder={t("propertyNamePlaceholder")}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                        {t("ownerName")}{" "}
                        <span className="text-white/30">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.ownerName}
                        onChange={(e) =>
                            updateData({ ownerName: e.target.value })
                        }
                        placeholder={t("ownerNamePlaceholder")}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                        {t("ownerEmail")}
                    </label>
                    <input
                        type="email"
                        value={data.ownerEmail}
                        onChange={(e) =>
                            updateData({ ownerEmail: e.target.value })
                        }
                        placeholder={t("ownerEmailPlaceholder")}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                    <p className="text-xs text-white/25 mt-1.5">
                        {t("ownerEmailHelp")}
                    </p>
                </div>
            </div>
        </div>
    );
}
