// Bioregion classification using WWF Ecoregions / One Earth data
// Uses a simplified lookup based on coordinates

const BIOREGIONS = [
    {
        name: "Mediterranean Forests, Woodlands & Scrub",
        realm: "Palearctic",
        biome: "Mediterranean",
        bounds: { latMin: 30, latMax: 46, lngMin: -10, lngMax: 40 },
        description:
            "Hot, dry summers and mild, wet winters characterize this bioregion. Cork oak, olive groves, and aromatic herbs dominate the landscape. Rich in endemic species adapted to fire and drought cycles.",
        keySpecies: [
            "Cork Oak",
            "Holm Oak",
            "Iberian Lynx",
            "Imperial Eagle",
            "Stone Pine",
        ],
    },
    {
        name: "Temperate Broadleaf & Mixed Forests",
        realm: "Palearctic",
        biome: "Temperate Forest",
        bounds: { latMin: 40, latMax: 60, lngMin: -10, lngMax: 40 },
        description:
            "Deciduous and mixed forests with distinct seasons. Supports high biodiversity including many migratory bird species. Rich soils ideal for agriculture and silviculture.",
        keySpecies: ["European Beech", "English Oak", "Red Deer", "Wild Boar", "European Badger"],
    },
    {
        name: "Tropical & Subtropical Moist Broadleaf Forests",
        realm: "Neotropical",
        biome: "Tropical Forest",
        bounds: { latMin: -25, latMax: 25, lngMin: -80, lngMax: -35 },
        description:
            "The most species-rich terrestrial biome. Warm, humid conditions year-round support extraordinary biodiversity and complex ecological relationships.",
        keySpecies: ["Jaguar", "Harpy Eagle", "Brazil Nut Tree", "Kapok Tree", "Poison Dart Frog"],
    },
    {
        name: "Temperate Grasslands, Savannas & Shrublands",
        realm: "Nearctic",
        biome: "Grassland",
        bounds: { latMin: 30, latMax: 55, lngMin: -110, lngMax: -80 },
        description:
            "Vast open landscapes dominated by grasses. Some of the most productive agricultural lands on Earth. Seasonal temperature extremes with periodic drought.",
        keySpecies: ["Bison", "Prairie Dog", "Pronghorn", "Western Meadowlark", "Big Bluestem"],
    },
    {
        name: "Deserts & Xeric Shrublands",
        realm: "Afrotropical",
        biome: "Desert",
        bounds: { latMin: 15, latMax: 35, lngMin: -20, lngMax: 60 },
        description:
            "Extremely arid regions with sparse vegetation. Life has evolved remarkable adaptations to heat and water scarcity. Fragile ecosystems sensitive to disturbance.",
        keySpecies: ["Date Palm", "Fennec Fox", "Addax", "Saharan Cheetah", "Acacia"],
    },
];

// Fallback bioregion
const UNKNOWN_BIOREGION = {
    name: "Unknown Bioregion",
    realm: "Unknown",
    biome: "Unknown",
    description:
        "Bioregion data is being analyzed for this location. Check back later for ecological context.",
    keySpecies: [],
};

export async function fetchBioregion(lat, lng) {
    try {
        // Simple point-in-bounds lookup
        const match = BIOREGIONS.find(
            (b) =>
                lat >= b.bounds.latMin &&
                lat <= b.bounds.latMax &&
                lng >= b.bounds.lngMin &&
                lng <= b.bounds.lngMax
        );

        const bioregion = match || UNKNOWN_BIOREGION;

        return {
            name: bioregion.name,
            realm: bioregion.realm,
            biome: bioregion.biome,
            description: bioregion.description,
            keySpecies: bioregion.keySpecies,
            source: "One Earth / WWF Ecoregions",
        };
    } catch (error) {
        console.error("Bioregion lookup error:", error);
        return null;
    }
}
