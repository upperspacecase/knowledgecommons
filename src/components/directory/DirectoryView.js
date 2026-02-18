"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import dynamic from "next/dynamic";
import {
    MapPin,
    List,
    Map,
    ArrowRight,
    Ruler,
    Globe2,
    Trees,
} from "lucide-react";

const DirectoryMap = dynamic(() => import("./DirectoryMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-96 rounded-xl bg-white/5 animate-pulse" />
    ),
});

export default function DirectoryView({ properties }) {
    const t = useTranslations("directory");
    const [view, setView] = useState("list");
    const [sort, setSort] = useState("newest");

    // Stats
    const totalProperties = properties.length;
    const totalHectares = properties.reduce(
        (sum, p) => sum + (p.approximateArea || 0),
        0
    );
    const uniqueBioregions = new Set(
        properties.map((p) => p.address?.split(",").pop()?.trim()).filter(Boolean)
    ).size;

    // Sort
    const sorted = [...properties].sort((a, b) => {
        if (sort === "newest")
            return new Date(b.createdAt) - new Date(a.createdAt);
        if (sort === "name")
            return (a.propertyName || "").localeCompare(b.propertyName || "");
        if (sort === "area")
            return (b.approximateArea || 0) - (a.approximateArea || 0);
        return 0;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
                    {t("title")}
                </h1>
                <p className="text-white/50 max-w-lg mx-auto">{t("subtitle")}</p>
            </div>

            {/* Impact stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="glass-card p-4 text-center">
                    <MapPin size={20} className="text-forest-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-forest-400">
                        {totalProperties}
                    </p>
                    <p className="text-xs text-white/40">Properties</p>
                </div>
                <div className="glass-card p-4 text-center">
                    <Ruler size={20} className="text-ocean-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-ocean-500">
                        {totalHectares.toLocaleString()}
                    </p>
                    <p className="text-xs text-white/40">Hectares</p>
                </div>
                <div className="glass-card p-4 text-center">
                    <Globe2 size={20} className="text-earth-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-earth-500">
                        {uniqueBioregions || 0}
                    </p>
                    <p className="text-xs text-white/40">Regions</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => setView("list")}
                        className={`btn btn-sm gap-1 ${view === "list"
                                ? "bg-forest-700 border-0 text-white"
                                : "btn-ghost text-white/40"
                            }`}
                    >
                        <List size={14} />
                        {t("viewToggle.list")}
                    </button>
                    <button
                        onClick={() => setView("map")}
                        className={`btn btn-sm gap-1 ${view === "map"
                                ? "bg-forest-700 border-0 text-white"
                                : "btn-ghost text-white/40"
                            }`}
                    >
                        <Map size={14} />
                        {t("viewToggle.map")}
                    </button>
                </div>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="select select-sm bg-white/5 border-white/10 text-white/60 text-xs"
                >
                    <option value="newest">{t("sort.newest")}</option>
                    <option value="name">{t("sort.name")}</option>
                    <option value="area">{t("sort.area")}</option>
                </select>
            </div>

            {/* Content */}
            {properties.length === 0 ? (
                <div className="text-center py-20">
                    <Trees size={48} className="text-white/10 mx-auto mb-4" />
                    <p className="text-white/40">{t("empty")}</p>
                    <Link
                        href="/contribute"
                        className="btn bg-gradient-to-r from-forest-700 to-forest-600 border-0 text-white rounded-full px-6 mt-6"
                    >
                        Create First Passport
                    </Link>
                </div>
            ) : view === "map" ? (
                <div className="h-[500px] rounded-2xl overflow-hidden border border-white/10">
                    <DirectoryMap properties={sorted} />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sorted.map((property) => (
                        <Link
                            key={property._id}
                            href={`/passport/${property._id}`}
                            className="glass-card p-5 hover:bg-white/8 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="font-semibold text-sm group-hover:text-forest-400 transition-colors">
                                    {property.propertyName}
                                </h3>
                                <ArrowRight
                                    size={14}
                                    className="text-white/20 group-hover:text-forest-400 transition-colors mt-0.5"
                                />
                            </div>

                            <div className="space-y-2 text-xs text-white/40">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={12} />
                                    <span className="truncate">
                                        {property.address || "Location set"}
                                    </span>
                                </div>

                                {property.approximateArea > 0 && (
                                    <div className="flex items-center gap-1.5">
                                        <Ruler size={12} />
                                        <span>
                                            {property.approximateArea} {property.areaUnit}
                                        </span>
                                    </div>
                                )}

                                {property.landUse?.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {property.landUse.slice(0, 3).map((use) => (
                                            <span
                                                key={use}
                                                className="px-2 py-0.5 rounded-full bg-forest-400/10 text-forest-400 text-xs capitalize"
                                            >
                                                {use}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
