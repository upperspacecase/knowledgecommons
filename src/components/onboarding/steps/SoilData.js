"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Upload, Info } from "lucide-react";

export default function SoilData({ data, updateData }) {
    const t = useTranslations("onboarding.steps.soil");
    const [hasResults, setHasResults] = useState(
        data.soilTestResults?.length > 0
    );
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const result = await res.json();
                updateData({
                    soilTestResults: [...(data.soilTestResults || []), result.url],
                });
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-serif text-2xl font-bold mb-1">{t("title")}</h2>
                <p className="text-white/50 text-sm">{t("subtitle")}</p>
            </div>

            {/* Toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    checked={hasResults}
                    onChange={(e) => setHasResults(e.target.checked)}
                    className="checkbox checkbox-sm border-white/20 [--chkbg:theme(colors.forest.600)]"
                />
                <span className="text-sm text-white/70">{t("hasResults")}</span>
            </label>

            {/* File upload */}
            {hasResults && (
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-white/70">
                        {t("uploadResults")}
                    </label>
                    <label className="dropzone flex flex-col items-center gap-2 cursor-pointer">
                        <Upload size={24} className="text-white/30" />
                        <span className="text-sm text-white/40">
                            {uploading ? "Uploading..." : "Click to upload"}
                        </span>
                        <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>

                    {/* Uploaded files */}
                    {data.soilTestResults?.map((url, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-forest-400 bg-forest-400/10 rounded-lg px-3 py-2"
                        >
                            <Upload size={14} />
                            <span className="truncate">File {i + 1} uploaded</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Soil type description */}
            <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                    {t("soilType")}
                </label>
                <textarea
                    value={data.soilType}
                    onChange={(e) => updateData({ soilType: e.target.value })}
                    placeholder={t("soilTypePlaceholder")}
                    rows={3}
                    className="textarea textarea-bordered w-full bg-white/5 border-white/10 focus:border-forest-500 text-white placeholder:text-white/30"
                />
            </div>

            {/* Auto-data note */}
            <div className="flex gap-2 items-start p-3 rounded-lg bg-ocean-500/10 border border-ocean-500/20">
                <Info size={16} className="text-ocean-500 mt-0.5 shrink-0" />
                <p className="text-xs text-ocean-400">{t("autoNote")}</p>
            </div>
        </div>
    );
}
