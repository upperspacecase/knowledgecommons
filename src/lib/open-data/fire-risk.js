export async function fetchFireRisk(lat, lng) {
    try {
        // NASA FIRMS (Fire Information for Resource Management System)
        // Free, global active fire data
        const endDate = new Date().toISOString().split("T")[0];
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0];

        // Check for recent fires within ~10km radius
        const mapKey = process.env.NASA_FIRMS_KEY || "DEMO_KEY";
        const res = await fetch(
            `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${mapKey}/VIIRS_SNPP_NRT/${lng - 0.1},${lat - 0.1},${lng + 0.1},${lat + 0.1}/1/30`
        );

        let recentFires = 0;
        if (res.ok) {
            const text = await res.text();
            const lines = text.trim().split("\n");
            recentFires = Math.max(0, lines.length - 1); // subtract header
        }

        // Determine risk level based on location + season
        let riskLevel = "low";
        const month = new Date().getMonth();

        // Portugal / Mediterranean fire season (June-October)
        if (lat >= 36 && lat <= 44 && lng >= -10 && lng <= 5) {
            if (month >= 5 && month <= 9) {
                riskLevel = "high";
            } else if (month >= 3 && month <= 10) {
                riskLevel = "moderate";
            }

            if (recentFires > 0) {
                riskLevel = "critical";
            }
        } else {
            // Generic assessment
            if (recentFires > 5) riskLevel = "high";
            else if (recentFires > 0) riskLevel = "moderate";
        }

        return {
            riskLevel,
            recentFires,
            season: getFireSeason(lat, month),
            source: "NASA FIRMS",
        };
    } catch (error) {
        console.error("Fire risk API error:", error);
        return {
            riskLevel: "unknown",
            recentFires: 0,
            season: null,
            source: "NASA FIRMS",
        };
    }
}

function getFireSeason(lat, month) {
    // Mediterranean
    if (lat >= 30 && lat <= 46) {
        if (month >= 5 && month <= 9) return "active";
        if (month >= 3 && month <= 10) return "shoulder";
        return "low";
    }
    // Southern Hemisphere
    if (lat < 0) {
        if (month >= 10 || month <= 2) return "active";
        return "low";
    }
    // Default Northern Hemisphere
    if (month >= 5 && month <= 9) return "active";
    return "low";
}
