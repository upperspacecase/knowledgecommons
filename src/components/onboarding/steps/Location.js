"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Search, MapPin } from "lucide-react";

const MapComponent = dynamic(() => import("./LocationMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-80 rounded-xl bg-white/5 animate-pulse flex items-center justify-center">
            <MapPin className="text-white/20" size={32} />
        </div>
    ),
});

export default function Location({ data, updateData }) {
    const t = useTranslations("onboarding.steps.location");
    const [searchQuery, setSearchQuery] = useState("");
    const [searching, setSearching] = useState(false);

    const handleSearch = useCallback(async () => {
        if (!searchQuery.trim()) return;
        setSearching(true);

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
                { headers: { "User-Agent": "LandPassport/1.0" } }
            );
            const results = await res.json();

            if (results.length > 0) {
                const { lat, lon, display_name } = results[0];
                updateData({
                    coordinates: { lat: parseFloat(lat), lng: parseFloat(lon) },
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

            // Reverse geocode
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`,
                    { headers: { "User-Agent": "LandPassport/1.0" } }
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
        <div className="space-y-6">
            <div>
                <h2 className="font-serif text-2xl font-bold mb-1">{t("title")}</h2>
                <p className="text-white/50 text-sm">{t("subtitle")}</p>
            </div>

            {/* Search bar */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                    />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder={t("searchPlaceholder")}
                        className="input input-bordered w-full pl-10 bg-white/5 border-white/10 focus:border-forest-500 text-white placeholder:text-white/30"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    disabled={searching}
                    className="btn bg-forest-700 border-0 text-white hover:bg-forest-600"
                >
                    {searching ? (
                        <span className="loading loading-spinner loading-sm" />
                    ) : (
                        <Search size={16} />
                    )}
                </button>
            </div>

            <p className="text-xs text-white/30">{t("clickMap")}</p>

            {/* Map */}
            <div className="h-80 rounded-xl overflow-hidden border border-white/10">
                <MapComponent
                    position={data.coordinates}
                    onMapClick={handleMapClick}
                />
            </div>

            {/* Coordinates display */}
            {data.coordinates && (
                <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-3">
                        <p className="text-xs text-white/40 mb-1">{t("coordinates")}</p>
                        <p className="text-sm font-mono">
                            {data.coordinates.lat.toFixed(6)}, {data.coordinates.lng.toFixed(6)}
                        </p>
                    </div>
                    <div className="glass-card p-3">
                        <p className="text-xs text-white/40 mb-1">{t("address")}</p>
                        <p className="text-sm truncate">{data.address || "—"}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
