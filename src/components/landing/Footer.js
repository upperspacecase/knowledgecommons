"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "../ui/LocaleSwitcher";

export default function Footer() {
    const t = useTranslations("footer");
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-black/8 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full border-2 border-black/20 flex items-center justify-center">
                                <div className="w-5 h-0.5 bg-black/40 rounded-full" />
                            </div>
                            <span className="font-serif text-xl tracking-tight text-[var(--foreground)]">
                                Knowledge Commons
                            </span>
                        </div>
                        <p className="text-sm text-black/40 max-w-xs leading-relaxed">
                            {t("tagline")}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h4 className="eyebrow text-black/40">
                            Links
                        </h4>
                        <div className="space-y-3">
                            <Link
                                href="/contribute"
                                className="block text-sm text-black/50 hover:text-[var(--foreground)] transition-colors"
                            >
                                {t("links.contribute")}
                            </Link>
                            <Link
                                href="/directory"
                                className="block text-sm text-black/50 hover:text-[var(--foreground)] transition-colors"
                            >
                                {t("links.directory")}
                            </Link>
                        </div>
                    </div>

                    {/* Language */}
                    <div className="space-y-4">
                        <h4 className="eyebrow text-black/40">
                            {t("language")}
                        </h4>
                        <LocaleSwitcher />
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-black/5 text-center">
                    <p className="text-xs text-black/25 tracking-wide">
                        {t("copyright", { year: String(year) })}
                    </p>
                </div>
            </div>
        </footer>
    );
}
