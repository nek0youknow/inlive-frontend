import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign in",
    description: "Sign in to your UI Tap account.",
    keywords: ["sign in", "login", "UI Tap", "account"],
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Sign in | UI Tap",
        description: "Sign in to your UI Tap account",
        url: "/auth/login",
        type: "website",
    },
    alternates: {
        canonical: "/auth/login",
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
