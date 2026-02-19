import { Inter, DM_Serif_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/landing/Footer";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
    variable: "--font-dm-serif",
    subsets: ["latin"],
    weight: "400",
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const messages = await getMessages({ locale });
    return {
        title: messages.common?.siteTitle || "Knowledge Commons",
        description:
            messages.landing?.hero?.subtitle ||
            "Your land, understood.",
    };
}

export default async function LocaleLayout({ children, params }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={`${inter.variable} ${dmSerif.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)]`}
            >
                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
