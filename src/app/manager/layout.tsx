import type { Metadata } from 'next'
import {ManagerSidebar} from "@/widgets/sidebar/ui/ManagerSidebar";
import {SidebarProvider} from "@/shared/ui/sidebar";

export const metadata: Metadata = {
    title: 'Менеджер - Управление недвижимостью',
    description: 'Панель управления для менеджеров недвижимости. Управляйте объектами, обрабатывайте заявки, настраивайте тарифы и доступность.',
    keywords: [
        'менеджер недвижимости',
        'управление объектами',
        'заявки',
        'тарифы',
        'недвижимость',
        'менеджер'
    ],
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: 'Менеджер - Управление недвижимостью | UI Tap',
        description: 'Панель управления для менеджеров недвижимости',
        url: '/manager',
        type: 'website',
    },
    alternates: {
        canonical: '/manager',
    },
}

export default function ManagerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <ManagerSidebar />
            <main className={"p-4 w-full"}>
                {children}
            </main>
        </SidebarProvider>
    )
}
