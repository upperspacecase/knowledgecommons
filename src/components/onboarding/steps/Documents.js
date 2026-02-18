"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Upload, FileText, Image, X } from "lucide-react";

export default function Documents({ data, updateData }) {
    const t = useTranslations("onboarding.steps.documents");
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleUpload = async (files) => {
        setUploading(true);
        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (res.ok) {
                    const result = await res.json();
                    updateData({
                        documents: [
                            ...(data.documents || []),
                            { name: result.name, url: result.url, type: result.type },
                        ],
                    });
                }
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setUploading(false);
        }
    };

    const removeDocument = (index) => {
        const updated = (data.documents || []).filter((_, i) => i !== index);
        updateData({ documents: updated });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-serif text-2xl font-bold mb-1">{t("title")}</h2>
                <p className="text-white/50 text-sm">{t("subtitle")}</p>
            </div>

            {/* Dropzone */}
            <label
                className={`dropzone flex flex-col items-center gap-3 cursor-pointer ${dragActive ? "active" : ""}`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    handleUpload(Array.from(e.dataTransfer.files));
                }}
            >
                <Upload size={32} className="text-white/20" />
                <p className="text-sm text-white/40">{t("dropzone")}</p>
                <p className="text-xs text-white/20">{t("accepted")}</p>
                <input
                    type="file"
                    accept=".pdf,image/*"
                    multiple
                    onChange={(e) => handleUpload(Array.from(e.target.files))}
                    className="hidden"
                />
            </label>

            {uploading && (
                <div className="text-center">
                    <span className="loading loading-spinner loading-md text-forest-400" />
                </div>
            )}

            {/* Uploaded documents list */}
            {(data.documents || []).length > 0 && (
                <div className="space-y-2">
                    {data.documents.map((doc, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 glass-card p-3"
                        >
                            {doc.type === "image" ? (
                                <Image size={16} className="text-ocean-500 shrink-0" />
                            ) : (
                                <FileText size={16} className="text-ember-500 shrink-0" />
                            )}
                            <span className="text-sm truncate flex-1">{doc.name}</span>
                            <button
                                onClick={() => removeDocument(i)}
                                className="p-1 rounded hover:bg-white/10"
                            >
                                <X size={14} className="text-white/30" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={() => { }}
                className="btn btn-ghost btn-sm text-white/40 w-full"
            >
                {t("noDocuments")}
            </button>
        </div>
    );
}
