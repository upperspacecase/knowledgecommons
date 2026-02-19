"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Search, MapPin } from "lucide-react";

const MapComponent = dynamic(() => import("./LocationMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-72 rounded-xl bg-white/5 animate-pulse flex items-center justify-center">
            <MapPin className="text-white/15" size={32} />
        </div>
    ),
});

export default function LocationAndSize({ data, updateData }) {
    const t = useTranslations("onboarding.steps.location");
    const tBounds = useTranslations("onboarding.steps.boundaries");
    const [searchQuery, setSearchQuery] = useState("");
    const [searching, setSearching] = useState(false);

    const handleSearch = useCallback(async () => {
        if (!searchQuery.trim()) return;
        setSearching(true);

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
                { headers: { "User-Agent": "KnowledgeCommons/1.0" } }
            );
            const results = await res.json();

            if (results.length > 0) {
                const { lat, lon, display_name } = results[0];
                updateData({
                    coordinates: {
                        lat: parseFloat(lat),
                        lng: parseFloat(lon),
                    },
                    address: display_name,
                });
            }
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setSearching(false);
        }
    }, [searchQuery, updateData]);

    const handleMapClick = useCallback(
        async (latlng) => {
            updateData({
                coordinates: { lat: latlng.lat, lng: latlng.lng },
            });

            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`,
                    { headers: { "User-Agent": "KnowledgeCommons/1.0" } }
                );
                const result = await res.json();
                if (result.display_name) {
                    updateData({ address: result.display_name });
                }
            } catch (e) {
                console.error("Reverse geocode error:", e);
            }
        },
        [updateData]
    );

    return (
        <div className="space-y-8">
            <div>
                <h2 className="font-serif text-3xl font-bold mb-2 text-white">
                    {t("title")}
                </h2>
                <p className="text-white/40 text-sm">{t("subtitle")}</p>
            </div>

            {/* Search bar */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
                    />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleSearch()
                        }
                        placeholder={t("searchPlaceholder")}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    disabled={searching}
                    className="px-4 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                    {searching ? (
                        <span className="loading loading-spinner loading-sm" />
                    ) : (
                        <Search size={16} />
                    )}
                </button>
            </div>

            <p className="text-xs text-white/25">{t("clickMap")}</p>

            {/* Map */}
            <div className="h-72 rounded-xl overflow-hidden border border-white/10">
                <MapComponent
                    position={data.coordinates}
                    onMapClick={handleMapClick}
                />
            </div>

            {/* Coordinates display */}
            {data.coordinates && (
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/8 rounded-xl p-3">
                        <p className="text-xs text-white/30 mb-1">
                            {t("coordinates")}
                        </p>
                        <p className="text-sm font-mono text-white/70">
                            {data.coordinates.lat.toFixed(6)},{" "}
                            {data.coordinates.lng.toFixed(6)}
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/8 rounded-xl p-3">
                        <p className="text-xs text-white/30 mb-1">
                            {t("address")}
                        </p>
                        <p className="text-sm text-white/70 truncate">
                            {data.address || "—"}
                        </p>
                    </div>
                </div>
            )}

            {/* Approximate area — merged from Boundaries */}
            <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                    {tBounds("areaOption")}
                </label>
                <div className="flex gap-3">
                    <input
                        type="number"
                        value={data.approximateArea}
                        onChange={(e) =>
                            updateData({ approximateArea: e.target.value })
                        }
                        placeholder={tBounds("areaPlaceholder")}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                    <select
                        value={data.areaUnit}
                        onChange={(e) =>
                            updateData({ areaUnit: e.target.value })
                        }
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                    >
                        <option value="hectares">ha</option>
                        <option value="acres">ac</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
