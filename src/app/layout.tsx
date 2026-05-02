import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/shared/ui/sonner";
import { QueryProvider } from "@/app/providers/query-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: "--font-inter",
});
const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin", "cyrillic"],
    variable: "--font-jetbrains-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const viewport: Viewport = {
    colorScheme: "dark",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#881337" },
        { media: "(prefers-color-scheme: dark)", color: "#4c0519" },
    ],
};

export const metadata: Metadata = {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    applicationName: "UI Tap",
    referrer: "origin-when-cross-origin",
    icons: {
        icon: "/favicon.ico",
        apple: "/favicon.ico",
    },
    title: {
        default: "UI Tap — find and manage housing in Kazakhstan",
        template: "%s | UI Tap",
    },
    description:
        "UI Tap is a modern platform to search and book housing in Kazakhstan.",
    keywords: [
        "real estate",
        "housing",
        "booking",
        "Kazakhstan",
        "apartments",
        "UI Tap",
    ],
    authors: [{ name: "UI Tap" }],
    creator: "UI Tap",
    publisher: "UI Tap",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        siteName: "UI Tap",
        title: "UI Tap — find and manage housing",
        description:
            "A modern platform to search and book housing in Kazakhstan",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "UI Tap — housing search",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "UI Tap — find and manage housing",
        description:
            "A modern platform to search and book housing in Kazakhstan",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "/",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body
                className={`${jetBrainsMono.className} ${inter.variable} ${jetBrainsMono.variable}`}
            >
                <QueryProvider>
                    <ThemeProvider>
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
