"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
    MapPin,
    Trees,
    Droplets,
    Mountain,
    Flame,
    Sun,
    Globe2,
    FileText,
    Target,
    AlertTriangle,
    ExternalLink,
    Copy,
    Check,
    Leaf,
    ThermometerSun,
    Wind,
    CloudRain,
} from "lucide-react";

const PassportMap = dynamic(() => import("./PassportMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-64 rounded-xl bg-black/5 animate-pulse" />
    ),
});

function DataCard({ icon: Icon, title, children, source, color = "forest" }) {
    const colorMap = {
        forest: { bg: "bg-[#6DB86B]/10", text: "text-[#6DB86B]", border: "border-[#6DB86B]/20" },
        ocean: { bg: "bg-[#4A90A4]/10", text: "text-[#4A90A4]", border: "border-[#4A90A4]/20" },
        earth: { bg: "bg-[#C25B3A]/10", text: "text-[#C25B3A]", border: "border-[#C25B3A]/20" },
        ember: { bg: "bg-[#E8926F]/10", text: "text-[#E8926F]", border: "border-[#E8926F]/20" },
    };
    const c = colorMap[color];

    return (
        <div className={`glass-card p-6 border ${c.border}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                    <Icon size={20} className={c.text} />
                </div>
                <div>
                    <h3 className="font-semibold text-sm text-[var(--foreground)]">{title}</h3>
                    {source && (
                        <span className={`source-badge ${source === "owner" ? "owner" : "auto"}`}>
                            {source === "owner" ? "Owner contributed" : "Auto-aggregated"}
                        </span>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}

export default function LandPassport({ property }) {
    const t = useTranslations("passport");
    const [openData, setOpenData] = useState(property.openData || null);
    const [loadingOpenData, setLoadingOpenData] = useState(!property.openData?.weather);
    const [copied, setCopied] = useState(false);

    // Fetch open data if not cached
    useEffect(() => {
        if (!property.openData?.weather) {
            fetch(`/api/open-data/${property._id}`)
                .then((res) => res.json())
                .then((data) => {
                    setOpenData(data);
                    setLoadingOpenData(false);
                })
                .catch(() => setLoadingOpenData(false));
        }
    }, [property._id, property.openData]);

    const coords = property.coordinates?.coordinates;
    const [lng, lat] = coords || [0, 0];

    const copyLink = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero */}
            <div className="mb-10">
                <div className="h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 border border-black/10">
                    <PassportMap lat={lat} lng={lng} />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2 text-[var(--foreground)]">
                            {property.propertyName}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-black/50">
                            <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {property.address || `${lat.toFixed(4)}, ${lng.toFixed(4)}`}
                            </span>
                            {property.approximateArea && (
                                <span className="px-2 py-0.5 rounded-full bg-black/5 text-xs">
                                    {property.approximateArea} {property.areaUnit}
                                </span>
                            )}
                            {openData?.bioregion && (
                                <span className="px-2 py-0.5 rounded-full bg-[#6DB86B]/10 text-[#6DB86B] text-xs">
                                    {openData.bioregion.biome}
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={copyLink}
                        className="btn btn-sm btn-ghost gap-2 text-black/40 hover:text-black/70"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? "Copied!" : "Share"}
                    </button>
                </div>

                <p className="text-xs text-black/30 mt-2">
                    {t("lastUpdated", {
                        date: new Date(property.updatedAt || property.createdAt).toLocaleDateString(),
                    })}
                </p>
            </div>

            {/* Your Land Section */}
            <section className="mb-12">
                <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--foreground)]">
                    <Leaf size={24} className="text-[#6DB86B]" />
                    {t("sections.yourLand")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Land Use */}
                    {property.landUse?.length > 0 && (
                        <DataCard icon={Trees} title={t("sections.landUse")} source="owner">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {property.landUse.map((use) => (
                                    <span key={use} className="tag-badge capitalize">
                                        {use}
                                    </span>
                                ))}
                            </div>
                            {property.landUseDescription && (
                                <p className="text-sm text-black/50 mt-2">
                                    {property.landUseDescription}
                                </p>
                            )}
                        </DataCard>
                    )}

                    {/* Soil */}
                    <DataCard
                        icon={Mountain}
                        title={t("sections.soil")}
                        source={openData?.soil ? "auto" : "owner"}
                        color="earth"
                    >
                        {property.soilType && (
                            <p className="text-sm text-black/70 mb-2">{property.soilType}</p>
                        )}
                        {openData?.soil?.properties &&
                            Object.entries(openData.soil.properties)
                                .slice(0, 4)
                                .map(([key, data]) => (
                                    <div
                                        key={key}
                                        className="flex justify-between text-xs text-black/50 py-1 border-b border-black/5 last:border-0"
                                    >
                                        <span>{data.label}</span>
                                        <span className="text-black/70">
                                            {data.depths?.["0-5cm"]?.value ?? "—"} {data.unit}
                                        </span>
                                    </div>
                                ))}
                        {!property.soilType && !openData?.soil && (
                            <p className="text-sm text-black/30">{t("data.noData")}</p>
                        )}
                    </DataCard>

                    {/* Water */}
                    {property.waterSources?.length > 0 && (
                        <DataCard icon={Droplets} title={t("sections.water")} source="owner" color="ocean">
                            {property.waterSources.map((source, i) => (
                                <div key={i} className="mb-2 last:mb-0">
                                    <span className="text-sm text-[#4A90A4] capitalize font-medium">
                                        {source.type}
                                    </span>
                                    {source.description && (
                                        <p className="text-xs text-black/50">{source.description}</p>
                                    )}
                                </div>
                            ))}
                        </DataCard>
                    )}

                    {/* Flora & Fauna */}
                    {((property.flora?.length > 0) || (property.fauna?.length > 0)) && (
                        <DataCard icon={Leaf} title={t("sections.floraFauna")} source="owner">
                            {property.flora?.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-xs text-black/40 mb-1 uppercase">Plants</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {property.flora.map((sp, i) => (
                                            <span key={i} className="tag-badge text-xs">
                                                {sp}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {property.fauna?.length > 0 && (
                                <div>
                                    <p className="text-xs text-black/40 mb-1 uppercase">Animals</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {property.fauna.map((sp, i) => (
                                            <span key={i} className="tag-badge text-xs">
                                                {sp}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </DataCard>
                    )}
                </div>
            </section>

            {/* Bioregion Section */}
            {openData?.bioregion && (
                <section className="mb-12">
                    <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--foreground)]">
                        <Globe2 size={24} className="text-[#4A90A4]" />
                        {t("sections.bioregion")}
                    </h2>
                    <div className="glass-card p-6 border border-[#4A90A4]/20">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-[#4A90A4]/15 text-[#4A90A4] text-sm font-medium">
                                {openData.bioregion.realm}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-[#6DB86B]/15 text-[#6DB86B] text-sm font-medium">
                                {openData.bioregion.biome}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
                            {openData.bioregion.name}
                        </h3>
                        <p className="text-sm text-black/50 leading-relaxed mb-4">
                            {openData.bioregion.description}
                        </p>
                        {openData.bioregion.keySpecies?.length > 0 && (
                            <div>
                                <p className="text-xs text-black/40 uppercase mb-2">
                                    Key Species
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {openData.bioregion.keySpecies.map((sp, i) => (
                                        <span key={i} className="tag-badge text-xs">
                                            {sp}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <p className="text-xs text-black/20 mt-4">
                            Source: {openData.bioregion.source}
                        </p>
                    </div>
                </section>
            )}

            {/* Seasons / Weather */}
            <section className="mb-12">
                <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--foreground)]">
                    <Sun size={24} className="text-[#C25B3A]" />
                    {t("sections.seasons")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Current Weather */}
                    {openData?.weather?.current && (
                        <DataCard
                            icon={ThermometerSun}
                            title={t("sections.weather")}
                            source="auto"
                            color="earth"
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-2xl font-bold text-[#C25B3A]">
                                        {Math.round(openData.weather.current.temp)}°C
                                    </p>
                                    <p className="text-xs text-black/50 capitalize">
                                        {openData.weather.current.description}
                                    </p>
                                </div>
                                <div className="space-y-1 text-xs text-black/50">
                                    <div className="flex items-center gap-1">
                                        <Droplets size={12} />
                                        {openData.weather.current.humidity}% humidity
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Wind size={12} />
                                        {openData.weather.current.windSpeed} m/s
                                    </div>
                                </div>
                            </div>
                            {openData.weather.location && (
                                <p className="text-xs text-black/20 mt-3">
                                    {openData.weather.location.name},{" "}
                                    {openData.weather.location.country}
                                </p>
                            )}
                        </DataCard>
                    )}

                    {/* Fire Risk */}
                    {openData?.fireRisk && (
                        <DataCard icon={Flame} title={t("sections.fireRisk")} source="auto" color="ember">
                            <div className="flex items-center gap-3 mb-2">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${openData.fireRisk.riskLevel === "critical"
                                        ? "bg-red-500/20 text-red-400"
                                        : openData.fireRisk.riskLevel === "high"
                                            ? "bg-[#E8926F]/20 text-[#E8926F]"
                                            : openData.fireRisk.riskLevel === "moderate"
                                                ? "bg-[#C25B3A]/20 text-[#C25B3A]"
                                                : "bg-[#6DB86B]/20 text-[#6DB86B]"
                                        }`}
                                >
                                    {openData.fireRisk.riskLevel}
                                </span>
                            </div>
                            {openData.fireRisk.recentFires > 0 && (
                                <p className="text-xs text-[#E8926F]">
                                    {openData.fireRisk.recentFires} active fire(s) detected
                                    nearby in the last 30 days
                                </p>
                            )}
                            <p className="text-xs text-black/20 mt-2">
                                Source: {openData.fireRisk.source}
                            </p>
                        </DataCard>
                    )}

                    {/* Elevation */}
                    {openData?.elevation && (
                        <DataCard icon={Mountain} title={t("sections.terrain")} source="auto" color="earth">
                            <p className="text-2xl font-bold text-[#C25B3A]">
                                {openData.elevation.elevation}m
                            </p>
                            <p className="text-sm text-black/50 capitalize">
                                {openData.elevation.terrain?.replace("_", " ")} terrain
                            </p>
                        </DataCard>
                    )}

                    {/* Fire History (owner data) */}
                    {property.fireHistory?.hasHistory && (
                        <DataCard icon={Flame} title="Fire History" source="owner" color="ember">
                            <p className="text-sm text-black/70">
                                Last fire: {property.fireHistory.lastFireYear || "Year unknown"}
                            </p>
                            {property.fireHistory.description && (
                                <p className="text-xs text-black/50 mt-1">
                                    {property.fireHistory.description}
                                </p>
                            )}
                            <span
                                className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${property.fireHistory.preparednessStatus === "prepared"
                                    ? "bg-[#6DB86B]/20 text-[#6DB86B]"
                                    : property.fireHistory.preparednessStatus === "partially"
                                        ? "bg-[#C25B3A]/20 text-[#C25B3A]"
                                        : "bg-[#E8926F]/20 text-[#E8926F]"
                                    }`}
                            >
                                {property.fireHistory.preparednessStatus}
                            </span>
                        </DataCard>
                    )}
                </div>
            </section>

            {/* Challenges & Goals */}
            {((property.challenges?.length > 0) || (property.goals?.length > 0)) && (
                <section className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {property.challenges?.length > 0 && (
                            <DataCard
                                icon={AlertTriangle}
                                title={t("sections.challenges")}
                                source="owner"
                                color="ember"
                            >
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {property.challenges.map((ch) => (
                                        <span
                                            key={ch}
                                            className="px-2 py-0.5 rounded-full bg-[#E8926F]/15 text-[#E8926F] text-xs capitalize"
                                        >
                                            {ch.replace("_", " ")}
                                        </span>
                                    ))}
                                </div>
                                {property.challengeDescription && (
                                    <p className="text-sm text-black/50">
                                        {property.challengeDescription}
                                    </p>
                                )}
                            </DataCard>
                        )}

                        {property.goals?.length > 0 && (
                            <DataCard
                                icon={Target}
                                title={t("sections.goals")}
                                source="owner"
                            >
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {property.goals.map((g) => (
                                        <span
                                            key={g}
                                            className="px-2 py-0.5 rounded-full bg-[#6DB86B]/15 text-[#6DB86B] text-xs capitalize"
                                        >
                                            {g}
                                        </span>
                                    ))}
                                </div>
                                {property.goalDescription && (
                                    <p className="text-sm text-black/50">
                                        {property.goalDescription}
                                    </p>
                                )}
                            </DataCard>
                        )}
                    </div>
                </section>
            )}

            {/* Documents */}
            {property.documents?.length > 0 && (
                <section className="mb-12">
                    <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--foreground)]">
                        <FileText size={24} className="text-black/50" />
                        {t("sections.documents")}
                    </h2>
                    <div className="space-y-2">
                        {property.documents.map((doc, i) => (
                            <a
                                key={i}
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 glass-card p-4 hover:bg-black/3 transition-colors group"
                            >
                                <FileText size={16} className="text-black/30" />
                                <span className="text-sm flex-1 text-[var(--foreground)]">{doc.name}</span>
                                <ExternalLink
                                    size={14}
                                    className="text-black/20 group-hover:text-[#6DB86B]"
                                />
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* Loading indicator for open data */}
            {loadingOpenData && (
                <div className="text-center py-8">
                    <span className="loading loading-spinner loading-lg text-[#6DB86B]" />
                    <p className="text-sm text-black/40 mt-3">
                        Fetching environmental data for this location...
                    </p>
                </div>
            )}
        </div>
    );
}
