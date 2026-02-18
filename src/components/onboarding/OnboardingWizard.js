"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

import PropertyInfo from "./steps/PropertyInfo";
import Location from "./steps/Location";
import Boundaries from "./steps/Boundaries";
import LandUse from "./steps/LandUse";
import SoilData from "./steps/SoilData";
import WaterSources from "./steps/WaterSources";
import FloraFauna from "./steps/FloraFauna";
import FireHistory from "./steps/FireHistory";
import Challenges from "./steps/Challenges";
import Goals from "./steps/Goals";
import Documents from "./steps/Documents";
import Review from "./steps/Review";
import Success from "./steps/Success";

const STEPS = [
    "propertyInfo",
    "location",
    "boundaries",
    "landUse",
    "soil",
    "water",
    "floraFauna",
    "fire",
    "challenges",
    "goals",
    "documents",
    "review",
];

const STEP_COMPONENTS = {
    propertyInfo: PropertyInfo,
    location: Location,
    boundaries: Boundaries,
    landUse: LandUse,
    soil: SoilData,
    water: WaterSources,
    floraFauna: FloraFauna,
    fire: FireHistory,
    challenges: Challenges,
    goals: Goals,
    documents: Documents,
    review: Review,
};

const STORAGE_KEY = "land-passport-draft";

const initialFormData = {
    propertyName: "",
    ownerName: "",
    ownerEmail: "",
    coordinates: null,
    address: "",
    boundaries: null,
    approximateArea: "",
    areaUnit: "hectares",
    landUse: [],
    landUseDescription: "",
    soilType: "",
    soilTestResults: [],
    waterSources: [],
    flora: [],
    fauna: [],
    floraFaunaDescription: "",
    fireHistory: {
        hasHistory: false,
        description: "",
        lastFireYear: "",
        preparednessStatus: "unprepared",
    },
    challenges: [],
    challengeDescription: "",
    goals: [],
    goalDescription: "",
    documents: [],
};

export default function OnboardingWizard() {
    const t = useTranslations("onboarding");
    const tActions = useTranslations("common.actions");
    const locale = useLocale();
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState(null);

    // Load draft from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setFormData((prev) => ({ ...prev, ...parsed }));
            } catch (e) {
                console.warn("Failed to load draft:", e);
            }
        }
    }, []);

    // Save draft on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

    const updateFormData = useCallback((updates) => {
        setFormData((prev) => ({ ...prev, ...updates }));
    }, []);

    const goNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const goBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const goToStep = (step) => {
        setCurrentStep(step);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Prepare the data for submission
            const payload = {
                ...formData,
                coordinates: formData.coordinates
                    ? {
                        type: "Point",
                        coordinates: [formData.coordinates.lng, formData.coordinates.lat],
                    }
                    : undefined,
                boundaries: formData.boundaries
                    ? { type: "Polygon", coordinates: formData.boundaries }
                    : undefined,
                approximateArea: formData.approximateArea
                    ? parseFloat(formData.approximateArea)
                    : undefined,
                fireHistory: {
                    ...formData.fireHistory,
                    lastFireYear: formData.fireHistory.lastFireYear
                        ? parseInt(formData.fireHistory.lastFireYear)
                        : undefined,
                },
                locale,
            };

            const res = await fetch("/api/properties", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error("Failed to create property");
            }

            const result = await res.json();
            setSubmitResult(result);

            // Clear draft
            localStorage.removeItem(STORAGE_KEY);

            // Trigger open data fetch in background
            fetch(`/api/open-data/${result.id}`).catch(console.error);
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show success screen
    if (submitResult) {
        return <Success id={submitResult.id} editToken={submitResult.editToken} />;
    }

    const stepKey = STEPS[currentStep];
    const StepComponent = STEP_COMPONENTS[stepKey];
    const isLastStep = currentStep === STEPS.length - 1;
    const isFirstStep = currentStep === 0;

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="font-serif text-3xl font-bold mb-2">{t("title")}</h1>
                <p className="text-white/50 text-sm">{t("subtitle")}</p>
            </div>

            {/* Progress bar */}
            <div className="mb-10">
                <div className="flex items-center justify-between text-xs text-white/40 mb-2">
                    <span>
                        {t("progress", {
                            current: currentStep + 1,
                            total: STEPS.length,
                        })}
                    </span>
                    <span>{Math.round(((currentStep + 1) / STEPS.length) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-forest-600 to-forest-400 rounded-full transition-all duration-500 ease-out"
                        style={{
                            width: `${((currentStep + 1) / STEPS.length) * 100}%`,
                        }}
                    />
                </div>
                {/* Step dots */}
                <div className="flex justify-between mt-3">
                    {STEPS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => i <= currentStep && goToStep(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentStep
                                    ? "bg-forest-400 scale-125"
                                    : i < currentStep
                                        ? "bg-forest-600 cursor-pointer hover:bg-forest-400"
                                        : "bg-white/10"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Step content */}
            <div className="glass-card p-6 sm:p-8 mb-8">
                <StepComponent
                    data={formData}
                    updateData={updateFormData}
                    goToStep={goToStep}
                />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={goBack}
                    disabled={isFirstStep}
                    className={`btn btn-ghost gap-2 ${isFirstStep ? "invisible" : ""
                        }`}
                >
                    <ArrowLeft size={16} />
                    {tActions("back")}
                </button>

                {isLastStep ? (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="btn bg-gradient-to-r from-forest-700 to-forest-600 border-0 text-white hover:from-forest-600 hover:to-forest-500 rounded-full px-8 gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Check size={16} />
                                {tActions("submit")}
                            </>
                        )}
                    </button>
                ) : (
                    <button
                        onClick={goNext}
                        className="btn bg-gradient-to-r from-forest-700 to-forest-600 border-0 text-white hover:from-forest-600 hover:to-forest-500 rounded-full px-8 gap-2"
                    >
                        {tActions("next")}
                        <ArrowRight size={16} />
                    </button>
                )}
            </div>
        </div>
    );
}
