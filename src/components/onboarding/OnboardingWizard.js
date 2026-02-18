"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

import PropertyInfo from "./steps/PropertyInfo";
import LocationAndSize from "./steps/LocationAndSize";
import YourLand from "./steps/YourLand";
import YourVision from "./steps/YourVision";
import Review from "./steps/Review";
import Success from "./steps/Success";

const STEPS = [
    "propertyInfo",
    "locationAndSize",
    "yourLand",
    "yourVision",
    "review",
];

const STEP_COMPONENTS = {
    propertyInfo: PropertyInfo,
    locationAndSize: LocationAndSize,
    yourLand: YourLand,
    yourVision: YourVision,
    review: Review,
};

const STORAGE_KEY = "knowledge-commons-draft";

const initialFormData = {
    propertyName: "",
    ownerName: "",
    ownerEmail: "",
    coordinates: null,
    address: "",
    approximateArea: "",
    areaUnit: "hectares",
    landUse: [],
    landUseDescription: "",
    waterSources: [],
    visionDescription: "",
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
            const payload = {
                ...formData,
                coordinates: formData.coordinates
                    ? {
                        type: "Point",
                        coordinates: [
                            formData.coordinates.lng,
                            formData.coordinates.lat,
                        ],
                    }
                    : undefined,
                approximateArea: formData.approximateArea
                    ? parseFloat(formData.approximateArea)
                    : undefined,
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
        return (
            <Success
                id={submitResult.id}
                editToken={submitResult.editToken}
            />
        );
    }

    const stepKey = STEPS[currentStep];
    const StepComponent = STEP_COMPONENTS[stepKey];
    const isLastStep = currentStep === STEPS.length - 1;
    const isFirstStep = currentStep === 0;

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Segmented progress bar */}
            <div className="flex gap-2 mb-10">
                {STEPS.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= currentStep
                                ? "bg-white"
                                : "bg-white/15"
                            }`}
                    />
                ))}
            </div>

            {/* Step content */}
            <div className="mb-10">
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
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${isFirstStep
                            ? "invisible"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                >
                    <ArrowLeft size={16} />
                    {tActions("back")}
                </button>

                {isLastStep ? (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-2.5 rounded-full text-sm font-bold bg-white text-black hover:bg-white/90 transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />
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
                        className="flex items-center gap-2 px-8 py-2.5 rounded-full text-sm font-bold bg-white text-black hover:bg-white/90 transition-all"
                    >
                        {tActions("next")}
                        <ArrowRight size={16} />
                    </button>
                )}
            </div>
        </div>
    );
}
