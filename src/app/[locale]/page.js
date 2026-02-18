import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/landing/Hero";
import Pillars from "@/components/landing/Pillars";
import HowItWorks from "@/components/landing/HowItWorks";
import ImpactMetrics from "@/components/landing/ImpactMetrics";
import BottomCTA from "@/components/landing/BottomCTA";

export default async function HomePage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Hero />
            <Pillars />
            <HowItWorks />
            <ImpactMetrics />
            <BottomCTA />
        </>
    );
}
