import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Регистрация | UI Tap - Платформа для поиска и управления жильем',
    description: 'Зарегистрируйтесь в UI Tap как клиент или менеджер. Клиенты получают доступ к тысячам объектов недвижимости, менеджеры могут управлять своими объектами и заявками.',
    keywords: [
        'регистрация',
        'UI Tap',
        'недвижимость',
        'жилье',
        'бронирование',
        'Казахстан',
        'апартаменты',
        'отели',
        'клиент',
        'менеджер',
        'управление недвижимостью'
    ],
    authors: [{ name: 'UI Tap' }],
    creator: 'UI Tap',
    publisher: 'UI Tap',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL 
        ? new URL(process.env.NEXT_PUBLIC_SITE_URL) 
        : undefined,
    alternates: {
        canonical: '/auth/register',
    },
    openGraph: {
        title: 'Регистрация | UI Tap - Платформа для поиска и управления жильем',
        description: 'Зарегистрируйтесь в UI Tap как клиент или менеджер. Клиенты получают доступ к тысячам объектов недвижимости, менеджеры могут управлять своими объектами и заявками.',
        url: '/auth/register',
        siteName: 'UI Tap',
        locale: 'ru_RU',
        type: 'website',
        images: [
            {
                url: '/og-register.png',
                width: 1200,
                height: 630,
                alt: 'UI Tap - Регистрация',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Регистрация | UI Tap',
        description: 'Зарегистрируйтесь в UI Tap как клиент или менеджер',
        images: ['/og-register.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        // Добавьте ваши ключи верификации при необходимости
        // google: 'your-google-verification-code',
        // yandex: 'your-yandex-verification-code',
    },
}

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}

