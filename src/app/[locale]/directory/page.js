import { setRequestLocale } from "next-intl/server";
import dbConnect from "@/lib/db";
import Property from "@/lib/models/Property";
import DirectoryView from "@/components/directory/DirectoryView";

export async function generateMetadata() {
    return {
        title: "Directory — Land Passport",
        description: "Explore all documented properties and their bioregional context.",
    };
}

export default async function DirectoryPage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);

    let properties = [];
    try {
        await dbConnect();
        properties = await Property.find(
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
            }
        )
            .sort({ createdAt: -1 })
            .lean();
    } catch (error) {
        console.error("Failed to fetch properties:", error);
    }

    const serialized = JSON.parse(JSON.stringify(properties));

    return (
        <div className="pt-20 min-h-screen">
            <DirectoryView properties={serialized} />
        </div>
    );
}
