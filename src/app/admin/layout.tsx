import {AdminSidebar} from "@/widgets/sidebar/ui/AdminSidebar";
import {SidebarProvider} from "@/shared/ui/sidebar";

export default function AdminLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider >
            <AdminSidebar />
            <main className={"p-4 w-full"}>
                {children}
            </main>
        </SidebarProvider>
    )
}
