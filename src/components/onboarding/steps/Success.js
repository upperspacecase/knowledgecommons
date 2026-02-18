"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { Check, Copy, ExternalLink, Lock } from "lucide-react";

export default function Success({ id, editToken }) {
    const t = useTranslations("onboarding.success");
    const locale = useLocale();
    const [copiedPublic, setCopiedPublic] = useState(false);
    const [copiedEdit, setCopiedEdit] = useState(false);

    const baseUrl =
        typeof window !== "undefined"
            ? window.location.origin
            : process.env.NEXT_PUBLIC_BASE_URL || "";
    const publicUrl = `${baseUrl}/${locale}/passport/${id}`;
    const editUrl = `${baseUrl}/${locale}/passport/${id}/edit?token=${editToken}`;

    const copyToClipboard = async (text, setCopied) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Copy error:", error);
        }
    };

    return (
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center">
            {/* Success animation */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-forest-600 to-forest-400 flex items-center justify-center mx-auto mb-8">
                <Check size={40} className="text-white" />
            </div>

            <h1 className="font-serif text-3xl font-bold mb-3">{t("title")}</h1>
            <p className="text-white/50 mb-10">{t("subtitle")}</p>

            {/* Public link */}
            <div className="glass-card p-5 mb-4 text-left">
                <div className="flex items-center gap-2 mb-2">
                    <ExternalLink size={14} className="text-forest-400" />
                    <span className="text-sm font-medium text-forest-400">
                        {t("publicLink")}
                    </span>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={publicUrl}
                        readOnly
                        className="input input-bordered input-sm flex-1 bg-white/5 border-white/10 text-white/70 font-mono text-xs"
                    />
                    <button
                        onClick={() => copyToClipboard(publicUrl, setCopiedPublic)}
                        className="btn btn-sm bg-forest-700 border-0 text-white hover:bg-forest-600 gap-1"
                    >
                        {copiedPublic ? (
                            <Check size={14} />
                        ) : (
                            <Copy size={14} />
                        )}
                    </button>
                </div>
            </div>

            {/* Edit link */}
            <div className="glass-card p-5 mb-8 text-left border-ember-500/20">
                <div className="flex items-center gap-2 mb-2">
                    <Lock size={14} className="text-ember-500" />
                    <span className="text-sm font-medium text-ember-500">
                        {t("editLink")}
                    </span>
                </div>
                <p className="text-xs text-white/30 mb-2">{t("editLinkHelp")}</p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={editUrl}
                        readOnly
                        className="input input-bordered input-sm flex-1 bg-white/5 border-white/10 text-white/70 font-mono text-xs"
                    />
                    <button
                        onClick={() => copyToClipboard(editUrl, setCopiedEdit)}
                        className="btn btn-sm bg-ember-500 border-0 text-white hover:bg-ember-600 gap-1"
                    >
                        {copiedEdit ? (
                            <Check size={14} />
                        ) : (
                            <Copy size={14} />
                        )}
                    </button>
                </div>
            </div>

            <Link
                href={`/passport/${id}`}
                className="btn bg-gradient-to-r from-forest-700 to-forest-600 border-0 text-white hover:from-forest-600 hover:to-forest-500 rounded-full px-8"
            >
                {t("viewPassport")}
            </Link>
        </div>
    );
}
