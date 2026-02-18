export async function fetchSatellite(lat, lng) {
    // Satellite imagery requires Sentinel Hub or Google Earth Engine API keys
    // For V1, we provide a link to Sentinel Hub EO Browser centered on coordinates
    return {
        eoBrowserUrl: `https://apps.sentinel-hub.com/eo-browser/?zoom=14&lat=${lat}&lng=${lng}&themeId=DEFAULT-THEME`,
        source: "Sentinel Hub EO Browser",
        note: "Click the link to explore satellite imagery for this location.",
    };
}
