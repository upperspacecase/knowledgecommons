"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar() {
    const t = useTranslations("common");
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isHome = pathname === "/";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { href: "/", label: t("nav.home") },
        { href: "/contribute", label: t("nav.contribute") },
        { href: "/directory", label: t("nav.directory") },
    ];

    // On homepage hero: white text until scrolled. On other pages: always dark.
    const showLight = isHome && !scrolled;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-[var(--background)]/95 backdrop-blur-xl border-b border-black/5"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between h-18 py-5">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 group"
                    >
                        <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-colors ${showLight ? "border-white/60" : "border-black/30"
                            }`}>
                            <div className={`w-5 h-0.5 rounded-full transition-colors ${showLight ? "bg-white/80" : "bg-black/60"
                                }`} />
                        </div>
                        <span className={`font-serif text-xl tracking-tight transition-colors ${showLight ? "text-white" : "text-[var(--foreground)]"
                            }`}>
                            {t("siteTitle")}
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-xs font-semibold uppercase tracking-widest transition-colors ${showLight
                                    ? pathname === link.href
                                        ? "text-white"
                                        : "text-white/60 hover:text-white"
                                    : pathname === link.href
                                        ? "text-[var(--foreground)]"
                                        : "text-black/50 hover:text-[var(--foreground)]"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <LocaleSwitcher />
                        <Link
                            href="/contribute"
                            className="btn-terracotta"
                        >
                            {t("actions.createPassport")}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className={`md:hidden p-2 rounded-lg transition-colors ${showLight ? "text-white hover:bg-white/10" : "text-[var(--foreground)] hover:bg-black/5"
                            }`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden pb-6 border-t border-black/8 mt-2 pt-4 space-y-3 bg-[var(--background)]/95 backdrop-blur-xl rounded-b-xl">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block py-2 px-4 rounded-lg text-sm font-medium text-[var(--foreground)]/80 hover:bg-black/5 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="px-4 pt-2 flex items-center gap-4">
                            <LocaleSwitcher />
                        </div>
                        <div className="px-4 pt-2">
                            <Link
                                href="/contribute"
                                className="btn-terracotta w-full justify-center"
                                onClick={() => setMenuOpen(false)}
                            >
                                {t("actions.createPassport")}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
