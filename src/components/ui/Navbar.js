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

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-[var(--background)]/95 backdrop-blur-xl border-b border-white/5"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between h-18 py-5">
                    {/* Logo — text-only like One Earth */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center">
                            <div className="w-5 h-0.5 bg-white/80 rounded-full" />
                        </div>
                        <span className="font-serif text-xl font-bold tracking-tight text-white">
                            {t("siteTitle")}
                        </span>
                    </Link>

                    {/* Desktop nav — uppercase tracking like One Earth */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-xs font-semibold uppercase tracking-widest transition-colors hover:text-white ${pathname === link.href
                                        ? "text-white"
                                        : "text-white/60"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <LocaleSwitcher />
                        <Link
                            href="/contribute"
                            className="btn-cta !py-2 !px-5 !text-xs"
                        >
                            {t("actions.createPassport")}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-white/5 text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden pb-6 border-t border-white/10 mt-2 pt-4 space-y-3 bg-[var(--background)]/95 backdrop-blur-xl rounded-b-xl">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block py-2 px-4 rounded-lg text-sm font-medium text-white/80 hover:bg-white/5 transition-colors"
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
                                className="btn-cta w-full justify-center !text-xs"
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
