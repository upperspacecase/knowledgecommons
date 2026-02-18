"use client";

import { useTranslations } from "next-intl";
import {
    Sprout,
    Trees,
    Tractor,
    Apple,
    Layers,
    HelpCircle,
    Droplets,
    Waves,
    Droplet,
    CloudRain,
    Pipette,
} from "lucide-react";

const landIcons = {
    crops: Sprout,
    forest: Trees,
    pasture: Tractor,
    orchard: Apple,
    mixed: Layers,
    other: HelpCircle,
};

const waterIcons = {
    well: Droplets,
    river: Waves,
    spring: Droplet,
    rainwater: CloudRain,
    irrigation: Pipette,
    other: HelpCircle,
};

const landTypes = ["crops", "forest", "pasture", "orchard", "mixed", "other"];
const waterTypes = [
    "well",
    "river",
    "spring",
    "rainwater",
    "irrigation",
    "other",
];

export default function YourLand({ data, updateData }) {
    const tLand = useTranslations("onboarding.steps.landUse");
    const tWater = useTranslations("onboarding.steps.water");

    const toggleLandUse = (type) => {
        const current = data.landUse || [];
        const updated = current.includes(type)
            ? current.filter((t) => t !== type)
            : [...current, type];
        updateData({ landUse: updated });
    };

    const toggleWater = (type) => {
        const current = data.waterSources || [];
        const exists = current.find((s) => s.type === type);
        const updated = exists
            ? current.filter((s) => s.type !== type)
            : [...current, { type, description: "" }];
        updateData({ waterSources: updated });
    };

    const selectedWater = (data.waterSources || []).map((s) => s.type);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="font-serif text-3xl font-bold mb-2">
                    {tLand("title")}
                </h2>
                <p className="text-white/40 text-sm">{tLand("subtitle")}</p>
            </div>

            {/* Land use toggles */}
            <div>
                <label className="block text-sm font-medium text-white/60 mb-3">
                    {tLand("title")}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {landTypes.map((type) => {
                        const Icon = landIcons[type];
                        const selected = (data.landUse || []).includes(type);
                        return (
                            <button
                                key={type}
                                onClick={() => toggleLandUse(type)}
                                className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${selected
                                        ? "bg-white/10 border-white/30 text-white"
                                        : "bg-white/3 border-white/8 text-white/50 hover:bg-white/5 hover:border-white/15"
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="text-sm font-medium">
                                    {tLand(`types.${type}`)}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Water sources toggles */}
            <div>
                <label className="block text-sm font-medium text-white/60 mb-3">
                    {tWater("title")}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {waterTypes.map((type) => {
                        const Icon = waterIcons[type];
                        const selected = selectedWater.includes(type);
                        return (
                            <button
                                key={type}
                                onClick={() => toggleWater(type)}
                                className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${selected
                                        ? "bg-white/10 border-white/30 text-white"
                                        : "bg-white/3 border-white/8 text-white/50 hover:bg-white/5 hover:border-white/15"
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="text-sm font-medium">
                                    {tWater(`types.${type}`)}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                    {tLand("descriptionLabel")}
                </label>
                <textarea
                    value={data.landUseDescription}
                    onChange={(e) =>
                        updateData({ landUseDescription: e.target.value })
                    }
                    placeholder={tLand("descriptionPlaceholder")}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
            </div>
        </div>
    );
}
