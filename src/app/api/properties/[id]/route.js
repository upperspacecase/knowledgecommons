import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Property from "@/lib/models/Property";

// GET — Fetch single property (public)
export async function GET(request, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const property = await Property.findById(id).lean();

        if (!property) {
            return NextResponse.json(
                { error: "Property not found" },
                { status: 404 }
            );
        }

        // Remove editToken from public response
        const { editToken, ...publicData } = property;

        return NextResponse.json(publicData);
    } catch (error) {
        console.error("Error fetching property:", error);
        return NextResponse.json(
            { error: "Failed to fetch property" },
            { status: 500 }
        );
    }
}

// PUT — Update property (requires edit token)
export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.json(
                { error: "Edit token required" },
                { status: 401 }
            );
        }

        const property = await Property.findById(id);

        if (!property) {
            return NextResponse.json(
                { error: "Property not found" },
                { status: 404 }
            );
        }

        if (property.editToken !== token) {
            return NextResponse.json(
                { error: "Invalid edit token" },
                { status: 401 }
            );
        }

        const data = await request.json();

        // Don't allow editing system fields
        delete data._id;
        delete data.editToken;
        delete data.createdAt;

        const updated = await Property.findByIdAndUpdate(
            id,
            { ...data, updatedAt: new Date() },
            { new: true, runValidators: true }
        ).lean();

        const { editToken: _, ...publicData } = updated;

        return NextResponse.json(publicData);
    } catch (error) {
        console.error("Error updating property:", error);
        return NextResponse.json(
            { error: "Failed to update property" },
            { status: 500 }
        );
    }
}
