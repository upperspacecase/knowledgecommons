"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { X } from "lucide-react";

function TagInput({ tags, onChange, placeholder }) {
    const [input, setInput] = useState("");

    const addTag = () => {
        const value = input.trim();
        if (value && !tags.includes(value)) {
            onChange([...tags, value]);
        }
        setInput("");
    };

    const removeTag = (index) => {
        onChange(tags.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, i) => (
                    <span key={i} className="tag-badge">
                        {tag}
                        <button onClick={() => removeTag(i)} className="hover:text-white">
                            <X size={12} />
                        </button>
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                    }
                }}
                placeholder={placeholder}
                className="input input-bordered w-full bg-white/5 border-white/10 focus:border-forest-500 text-white placeholder:text-white/30"
            />
        </div>
    );
}

export default function FloraFauna({ data, updateData }) {
    const t = useTranslations("onboarding.steps.floraFauna");

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-serif text-2xl font-bold mb-1">{t("title")}</h2>
                <p className="text-white/50 text-sm">{t("subtitle")}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                    {t("floraLabel")}
                </label>
                <TagInput
                    tags={data.flora || []}
                    onChange={(flora) => updateData({ flora })}
                    placeholder={t("floraPlaceholder")}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                    {t("faunaLabel")}
                </label>
                <TagInput
                    tags={data.fauna || []}
                    onChange={(fauna) => updateData({ fauna })}
                    placeholder={t("faunaPlaceholder")}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                    {t("descriptionLabel")}
                </label>
                <textarea
                    value={data.floraFaunaDescription}
                    onChange={(e) =>
                        updateData({ floraFaunaDescription: e.target.value })
                    }
                    placeholder={t("descriptionPlaceholder")}
                    rows={3}
                    className="textarea textarea-bordered w-full bg-white/5 border-white/10 focus:border-forest-500 text-white placeholder:text-white/30"
                />
            </div>
        </div>
    );
}
