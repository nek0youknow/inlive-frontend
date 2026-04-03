import {ClientHeader} from "@/widgets/client-header/ui/ClientHeader";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Клиент - Поиск жилья',
    description: 'Найдите идеальное жилье для отдыха в Казахстане. Удобный поиск по критериям, бронирование и управление заявками.',
    keywords: [
        'поиск жилья',
        'бронирование',
        'апартаменты',
        'отели',
        'жилье для отдыха',
        'Казахстан',
        'клиент'
    ],
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: 'Клиент - Поиск жилья | UI Tap',
        description: 'Найдите идеальное жилье для отдыха в Казахстане',
        url: '/client',
        type: 'website',
    },
    alternates: {
        canonical: '/client',
    },
}

export default function ClientLayout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"bg-green-50 min-h-screen flex flex-col"}>
            <ClientHeader />
            <main className={"flex-1"}>
                {children}
            </main>
        </div>
    )
}
