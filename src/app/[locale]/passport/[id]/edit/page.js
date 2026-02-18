import { setRequestLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import Property from "@/lib/models/Property";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";

export default async function EditPage({ params, searchParams }) {
    const { locale, id } = await params;
    const { token } = await searchParams;
    setRequestLocale(locale);

    if (!token) {
        redirect(`/${locale}/passport/${id}`);
    }

    let property;
    try {
        await dbConnect();
        property = await Property.findById(id).lean();
    } catch {
        notFound();
    }

    if (!property || property.editToken !== token) {
        redirect(`/${locale}/passport/${id}`);
    }

    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-3xl mx-auto px-4 py-8 text-center mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-earth-500/15 border border-earth-500/30 text-earth-400 text-sm font-medium">
                    Editing: {property.propertyName}
                </div>
            </div>
            <OnboardingWizard />
        </div>
    );
}
