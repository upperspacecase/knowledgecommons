"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    function switchLocale(nextLocale) {
        router.replace(pathname, { locale: nextLocale });
    }

    return (
        <div className="flex items-center gap-1.5">
            <Globe size={14} className="text-current opacity-40" />
            <button
                onClick={() => switchLocale("en")}
                className={`text-xs font-medium px-1.5 py-0.5 rounded transition-colors ${locale === "en"
                        ? "text-[var(--color-green-accent)] bg-[var(--color-green-accent)]/10"
                        : "text-current opacity-40 hover:opacity-70"
                    }`}
            >
                EN
            </button>
            <span className="text-current opacity-20">|</span>
            <button
                onClick={() => switchLocale("pt")}
                className={`text-xs font-medium px-1.5 py-0.5 rounded transition-colors ${locale === "pt"
                        ? "text-[var(--color-green-accent)] bg-[var(--color-green-accent)]/10"
                        : "text-current opacity-40 hover:opacity-70"
                    }`}
            >
                PT
            </button>
        </div>
    );
}
