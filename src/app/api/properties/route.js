import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Property from "@/lib/models/Property";
import { generateEditToken } from "@/lib/utils";

// POST — Create a new property
export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();

        const editToken = generateEditToken();

        const property = await Property.create({
            ...data,
            editToken,
        });

        return NextResponse.json(
            {
                id: property._id,
                editToken: property.editToken,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating property:", error);

        if (error.name === "ValidationError") {
            return NextResponse.json(
                { error: "Validation error", details: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create property" },
            { status: 500 }
        );
    }
}

// GET — List all properties (for directory)
export async function GET() {
    try {
        await dbConnect();

        const properties = await Property.find(
            {},
            {
                propertyName: 1,
                ownerName: 1,
                coordinates: 1,
                address: 1,
                landUse: 1,
                approximateArea: 1,
                areaUnit: 1,
                goals: 1,
                createdAt: 1,
                "openData.bioregion": 1,
            }
        )
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        return NextResponse.json(
            { error: "Failed to fetch properties" },
            { status: 500 }
        );
    }
}
