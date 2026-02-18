"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "../ui/LocaleSwitcher";

export default function Footer() {
    const t = useTranslations("footer");
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-white/8 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full border-2 border-white/40 flex items-center justify-center">
                                <div className="w-5 h-0.5 bg-white/60 rounded-full" />
                            </div>
                            <span className="font-serif text-xl font-bold tracking-tight">
                                Knowledge Commons
                            </span>
                        </div>
                        <p className="text-sm text-white/40 max-w-xs leading-relaxed">
                            {t("tagline")}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest">
                            Links
                        </h4>
                        <div className="space-y-3">
                            <Link
                                href="/contribute"
                                className="block text-sm text-white/50 hover:text-cream transition-colors"
                            >
                                {t("links.contribute")}
                            </Link>
                            <Link
                                href="/directory"
                                className="block text-sm text-white/50 hover:text-cream transition-colors"
                            >
                                {t("links.directory")}
                            </Link>
                        </div>
                    </div>

                    {/* Language */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest">
                            {t("language")}
                        </h4>
                        <LocaleSwitcher />
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 text-center">
                    <p className="text-xs text-white/25 tracking-wide">
                        {t("copyright", { year: String(year) })}
                    </p>
                </div>
            </div>
        </footer>
    );
}
