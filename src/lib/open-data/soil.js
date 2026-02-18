export async function fetchSoilData(lat, lng) {
    try {
        // ISRIC SoilGrids API
        const properties = [
            "clay",
            "sand",
            "silt",
            "phh2o",
            "soc",
            "bdod",
            "nitrogen",
        ];
        const depths = ["0-5cm", "5-15cm", "15-30cm"];

        const res = await fetch(
            `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lng}&lat=${lat}&property=${properties.join(",")}&depth=${depths.join(",")}&value=mean`,
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        if (!res.ok) {
            console.warn("SoilGrids API responded with:", res.status);
            return null;
        }

        const data = await res.json();

        // Parse response into readable format
        const parsed = {};
        if (data.properties?.layers) {
            for (const layer of data.properties.layers) {
                const depthValues = {};
                for (const depth of layer.depths || []) {
                    depthValues[depth.label] = {
                        value: depth.values?.mean,
                        unit: layer.unit_measure?.mapped_units,
                    };
                }
                parsed[layer.name] = {
                    label: getPropertyLabel(layer.name),
                    depths: depthValues,
                    unit: layer.unit_measure?.mapped_units,
                };
            }
        }

        return {
            properties: parsed,
            coordinates: { lat, lng },
            source: "ISRIC SoilGrids",
        };
    } catch (error) {
        console.error("Soil API error:", error);
        return null;
    }
}

function getPropertyLabel(name) {
    const labels = {
        clay: "Clay Content",
        sand: "Sand Content",
        silt: "Silt Content",
        phh2o: "pH (water)",
        soc: "Organic Carbon",
        bdod: "Bulk Density",
        nitrogen: "Nitrogen",
    };
    return labels[name] || name;
}
