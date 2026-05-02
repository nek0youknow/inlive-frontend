import { ClientHeader } from "@/widgets/client-header/ui/ClientHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Client — housing search",
    description:
        "Find the perfect place to stay in Kazakhstan. Search, book, and manage requests.",
    keywords: [
        "housing search",
        "booking",
        "apartments",
        "hotels",
        "Kazakhstan",
        "client",
    ],
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Client — housing search | UI Tap",
        description:
            "Find the perfect place to stay in Kazakhstan",
        url: "/client",
        type: "website",
    },
    alternates: {
        canonical: "/client",
    },
};

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"bg-rose-950/40 min-h-screen flex flex-col"}>
            <ClientHeader />
            <main className={"flex-1"}>{children}</main>
        </div>
    );
}
