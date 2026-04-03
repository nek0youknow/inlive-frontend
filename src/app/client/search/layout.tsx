import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Поиск жилья',
    description: 'Найдите идеальное жилье по вашим критериям: даты заезда, количество гостей, цена, район, рейтинг и многое другое.',
    keywords: [
        'поиск жилья',
        'поиск апартаментов',
        'бронирование',
        'жилье',
        'Казахстан',
        'поиск по критериям'
    ],
    openGraph: {
        title: 'Поиск жилья | UI Tap',
        description: 'Найдите идеальное жилье по вашим критериям',
        url: '/client/search',
        type: 'website',
    },
    alternates: {
        canonical: '/client/search',
    },
}

export default function SearchLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}

