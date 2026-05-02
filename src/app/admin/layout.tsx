import { AdminSidebar } from "@/widgets/sidebar/ui/AdminSidebar";
import { SidebarProvider } from "@/shared/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Administrator",
    description: "UI Tap administrator dashboard.",
    keywords: ["admin", "UI Tap"],
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Administrator | UI Tap",
        description: "UI Tap administrator dashboard",
        url: "/admin",
        type: "website",
    },
    alternates: {
        canonical: "/admin",
    },
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className={"p-4 w-full"}>{children}</main>
        </SidebarProvider>
    );
}
