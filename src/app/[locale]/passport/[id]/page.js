import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Property from "@/lib/models/Property";
import LandPassport from "@/components/passport/LandPassport";

export async function generateMetadata({ params }) {
    const { id } = await params;
    try {
        await dbConnect();
        const property = await Property.findById(id).lean();
        if (!property) return { title: "Property Not Found" };
        return {
            title: `${property.propertyName} — Land Passport`,
            description: `Land Passport for ${property.propertyName} in ${property.address || "unknown location"}.`,
        };
    } catch {
        return { title: "Land Passport" };
    }
}

export default async function PassportPage({ params }) {
    const { locale, id } = await params;
    setRequestLocale(locale);

    let property;
    try {
        await dbConnect();
        property = await Property.findById(id).lean();
    } catch {
        notFound();
    }

    if (!property) notFound();

    // Remove sensitive data
    const { editToken, ...publicData } = property;

    // Serialize dates and ObjectId
    const serialized = JSON.parse(JSON.stringify(publicData));

    return (
        <div className="pt-16">
            <LandPassport property={serialized} />
        </div>
    );
}
