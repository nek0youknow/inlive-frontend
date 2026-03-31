import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Вход в систему',
    description: 'Войдите в свой аккаунт UI Tap. Доступ для клиентов, менеджеров и администраторов платформы недвижимости.',
    keywords: [
        'вход',
        'авторизация',
        'UI Tap',
        'войти',
        'логин',
        'аккаунт',
        'недвижимость'
    ],
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: 'Вход в систему | UI Tap',
        description: 'Войдите в свой аккаунт UI Tap',
        url: '/auth/login',
        type: 'website',
    },
    alternates: {
        canonical: '/auth/login',
    },
}

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}

