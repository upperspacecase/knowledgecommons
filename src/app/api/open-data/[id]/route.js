import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Property from "@/lib/models/Property";
import { fetchWeather } from "@/lib/open-data/weather";
import { fetchSoilData } from "@/lib/open-data/soil";
import { fetchElevation } from "@/lib/open-data/elevation";
import { fetchBioregion } from "@/lib/open-data/bioregion";
import { fetchFireRisk } from "@/lib/open-data/fire-risk";

// GET — Fetch & cache open data for a property
export async function GET(request, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const property = await Property.findById(id);

        if (!property) {
            return NextResponse.json(
                { error: "Property not found" },
                { status: 404 }
            );
        }

        // Check cache freshness (24 hours)
        const cacheAge = property.openData?.fetchedAt
            ? Date.now() - new Date(property.openData.fetchedAt).getTime()
            : Infinity;

        if (cacheAge < 24 * 60 * 60 * 1000 && property.openData?.weather) {
            return NextResponse.json(property.openData);
        }

        // Fetch all open data in parallel
        const [lng, lat] = property.coordinates.coordinates;

        const [weather, soil, elevation, bioregion, fireRisk] =
            await Promise.allSettled([
                fetchWeather(lat, lng),
                fetchSoilData(lat, lng),
                fetchElevation(lat, lng),
                fetchBioregion(lat, lng),
                fetchFireRisk(lat, lng),
            ]);

        const openData = {
            weather: weather.status === "fulfilled" ? weather.value : null,
            soil: soil.status === "fulfilled" ? soil.value : null,
            elevation: elevation.status === "fulfilled" ? elevation.value : null,
            bioregion: bioregion.status === "fulfilled" ? bioregion.value : null,
            fireRisk: fireRisk.status === "fulfilled" ? fireRisk.value : null,
            satellite: null, // placeholder — requires separate API key setup
            fetchedAt: new Date(),
        };

        // Cache results
        await Property.findByIdAndUpdate(id, { openData });

        return NextResponse.json(openData);
    } catch (error) {
        console.error("Error fetching open data:", error);
        return NextResponse.json(
            { error: "Failed to fetch open data" },
            { status: 500 }
        );
    }
}
