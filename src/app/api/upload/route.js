import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "File type not allowed. Accepted: PDF, JPEG, PNG, WebP" },
                { status: 400 }
            );
        }

        // Max 10MB
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File too large. Maximum size: 10MB" },
                { status: 400 }
            );
        }

        const blob = await put(`land-passport/${Date.now()}-${file.name}`, file, {
            access: "public",
        });

        return NextResponse.json({
            url: blob.url,
            name: file.name,
            type: file.type.startsWith("image/") ? "image" : "pdf",
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}
