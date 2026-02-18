export async function fetchElevation(lat, lng) {
    try {
        const res = await fetch(
            `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`
        );

        if (!res.ok) {
            console.warn("Elevation API responded with:", res.status);
            return null;
        }

        const data = await res.json();
        const elevation = data.results?.[0]?.elevation;

        if (elevation == null) return null;

        // Classify terrain
        let terrain = "flat";
        if (elevation > 1000) terrain = "highland";
        else if (elevation > 500) terrain = "mountainous";
        else if (elevation > 200) terrain = "hilly";
        else if (elevation < 50) terrain = "coastal_lowland";

        return {
            elevation,
            unit: "meters",
            terrain,
            source: "Open Elevation",
        };
    } catch (error) {
        console.error("Elevation API error:", error);
        return null;
    }
}
