import type { Metadata } from "next";
import { ManagerSidebar } from "@/widgets/sidebar/ui/ManagerSidebar";
import { SidebarProvider } from "@/shared/ui/sidebar";

export const metadata: Metadata = {
    title: "Manager — property management",
    description: "Dashboard for property managers.",
    keywords: ["manager", "property", "UI Tap"],
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Manager — property management | UI Tap",
        description: "Dashboard for property managers",
        url: "/manager",
        type: "website",
    },
    alternates: {
        canonical: "/manager",
    },
};

export default function ManagerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <ManagerSidebar />
            <main className={"p-4 w-full"}>{children}</main>
        </SidebarProvider>
    );
}
