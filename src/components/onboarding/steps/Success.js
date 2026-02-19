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
            {/* Success icon */}
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-8">
                <Check size={40} className="text-black" />
            </div>

            <h1 className="font-serif text-3xl font-bold mb-3 text-white">
                {t("title")}
            </h1>
            <p className="text-white/40 mb-10">{t("subtitle")}</p>

            {/* Public link */}
            <div className="bg-white/5 border border-white/8 rounded-xl p-5 mb-4 text-left">
                <div className="flex items-center gap-2 mb-2">
                    <ExternalLink size={14} className="text-white/40" />
                    <span className="text-sm font-medium text-white/60">
                        {t("publicLink")}
                    </span>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={publicUrl}
                        readOnly
                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-white/50 font-mono text-xs"
                    />
                    <button
                        onClick={() =>
                            copyToClipboard(publicUrl, setCopiedPublic)
                        }
                        className="px-3 py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors"
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
            <div className="bg-white/5 border border-white/8 rounded-xl p-5 mb-8 text-left">
                <div className="flex items-center gap-2 mb-2">
                    <Lock size={14} className="text-white/40" />
                    <span className="text-sm font-medium text-white/60">
                        {t("editLink")}
                    </span>
                </div>
                <p className="text-xs text-white/25 mb-2">
                    {t("editLinkHelp")}
                </p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={editUrl}
                        readOnly
                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-white/50 font-mono text-xs"
                    />
                    <button
                        onClick={() =>
                            copyToClipboard(editUrl, setCopiedEdit)
                        }
                        className="px-3 py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors"
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
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold bg-white text-black hover:bg-white/90 transition-all"
            >
                {t("viewPassport")}
            </Link>
        </div>
    );
}
