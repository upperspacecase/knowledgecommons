import { setRequestLocale } from "next-intl/server";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";

export async function generateMetadata() {
    return {
        title: "Create Your Land Passport",
        description:
            "Walk through a guided intake to create a living digital profile of your property.",
    };
}

export default async function ContributePage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="pt-20 min-h-screen">
            <OnboardingWizard />
        </div>
    );
}
