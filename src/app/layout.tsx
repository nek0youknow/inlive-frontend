import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import {Toaster} from "sonner";
import {QueryProvider} from "@/app/providers/query-provider";

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const viewport: Viewport = {
    colorScheme: 'light',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#16a34a' },
        { media: '(prefers-color-scheme: dark)', color: '#15803d' },
    ],
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    applicationName: 'UI Tap',
    referrer: 'origin-when-cross-origin',
    icons: {
        icon: '/favicon.ico',
        apple: '/favicon.ico',
    },
    title: {
        default: 'UI Tap - Платформа для поиска и управления жильем в Казахстане',
        template: '%s | UI Tap'
    },
    description: 'UI Tap - современная платформа для поиска и бронирования жилья в Казахстане. Тысячи объектов недвижимости, удобный поиск, безопасное бронирование. Для клиентов и менеджеров недвижимости.',
    keywords: [
        'недвижимость',
        'жилье',
        'бронирование',
        'Казахстан',
        'апартаменты',
        'отели',
        'поиск жилья',
        'аренда',
        'UI Tap',
        'TapHome'
    ],
    authors: [{ name: 'UI Tap' }],
    creator: 'UI Tap',
    publisher: 'UI Tap',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'ru_RU',
        url: siteUrl,
        siteName: 'UI Tap',
        title: 'UI Tap - Платформа для поиска и управления жильем',
        description: 'Современная платформа для поиска и бронирования жилья в Казахстане',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'UI Tap - Платформа для поиска жилья',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'UI Tap - Платформа для поиска и управления жильем',
        description: 'Современная платформа для поиска и бронирования жилья в Казахстане',
        images: ['/og-image.png'],
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
    alternates: {
        canonical: '/',
    },
    verification: {
        // Добавьте ваши ключи верификации при необходимости
        // google: 'your-google-verification-code',
        // yandex: 'your-yandex-verification-code',
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body className={inter.className}>
                <QueryProvider>
                    {children}
                    <Toaster />
                </QueryProvider>
            </body>
        </html>
    )
}
