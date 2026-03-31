"use client"
import { Button } from "@/shared/ui/button"
import { ArrowRight, Building2, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Container } from "@/shared/ui/container"
import { useEffect } from "react"

export default function RegisterSelectionPage() {
    // Структурированные данные для SEO
    useEffect(() => {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Регистрация в UI Tap",
            "description": "Страница регистрации для клиентов и менеджеров платформы UI Tap",
            "url": typeof window !== 'undefined' ? window.location.href : '',
            "inLanguage": "ru-RU",
            "isPartOf": {
                "@type": "WebSite",
                "name": "UI Tap",
                "url": typeof window !== 'undefined' ? window.location.origin : ''
            },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Главная",
                        "item": typeof window !== 'undefined' ? `${window.location.origin}/` : ''
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Регистрация",
                        "item": typeof window !== 'undefined' ? window.location.href : ''
                    }
                ]
            },
            "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Регистрация клиента",
                        "description": "Регистрация для поиска и бронирования жилья"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Регистрация менеджера",
                        "description": "Регистрация для управления объектами недвижимости"
                    }
                ]
            }
        }

        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.text = JSON.stringify(structuredData)
        document.head.appendChild(script)

        return () => {
            document.head.removeChild(script)
        }
    }, [])

    return (
        <>
            <div className="sr-only">
                <h1>Регистрация в UI Tap - Выберите тип аккаунта</h1>
            </div>
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-green-50 flex items-center justify-center py-8 sm:py-12">
                <Container>
                    <div className="max-w-3xl mx-auto px-4 sm:px-6">
                        {/* Кнопка назад */}
                        <nav aria-label="Навигация">
                            <Link href="/" className="inline-flex items-center text-sm sm:text-base text-gray-600 hover:text-gray-900 mb-6 sm:mb-8 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                                Вернуться на главную
                            </Link>
                        </nav>

                        {/* Заголовок */}
                        <header className="text-center mb-8 sm:mb-12">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                                Выберите тип регистрации
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
                                Выберите роль, которая лучше всего описывает вас, чтобы начать работу с платформой
                            </p>
                        </header>

                        {/* Карточки выбора */}
                        <section aria-label="Варианты регистрации">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
                                <Link href="/auth/client/register" className="group" aria-label="Зарегистрироваться как клиент">
                                    <article className="p-8 sm:p-10 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col items-center text-center">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors" aria-hidden="true">
                                            <Home className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                            Клиент
                                        </h2>
                                        <p className="text-sm sm:text-base text-gray-600 mb-6 flex-grow">
                                            Ищете жилье для отдыха? Зарегистрируйтесь как клиент и получите доступ к тысячам объектов недвижимости по всему Казахстану.
                                        </p>
                                        <ul className="text-left text-sm sm:text-base text-gray-600 mb-6 space-y-2 w-full">
                                            <li className="flex items-start">
                                                <span className="text-green-600 mr-2">✓</span>
                                                Поиск жилья по вашим критериям
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-green-600 mr-2">✓</span>
                                                Бронирование и управление заявками
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-green-600 mr-2">✓</span>
                                                Просмотр истории бронирований
                                            </li>
                                        </ul>
                                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                            Зарегистрироваться
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </article>
                                </Link>

                                <Link href="/auth/manager/register" className="group" aria-label="Зарегистрироваться как менеджер">
                                    <article className="p-8 sm:p-10 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col items-center text-center">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors" aria-hidden="true">
                                            <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                            Менеджер
                                        </h2>
                                        <p className="text-sm sm:text-base text-gray-600 mb-6 flex-grow">
                                            Управляете объектами недвижимости? Станьте менеджером и получите инструменты для управления своими объектами и заявками.
                                        </p>
                                        <ul className="text-left text-sm sm:text-base text-gray-600 mb-6 space-y-2 w-full">
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-2">✓</span>
                                                Управление объектами недвижимости
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-2">✓</span>
                                                Обработка заявок от клиентов
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-2">✓</span>
                                                Управление тарифами и доступностью
                                            </li>
                                        </ul>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                            Зарегистрироваться
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </article>
                                </Link>
                            </div>
                        </section>
                        

                        {/* Ссылка на вход */}
                        <footer className="text-center">
                            <p className="text-sm sm:text-base text-gray-600 mb-4">
                                Уже есть аккаунт?
                            </p>
                            <Link href="/auth/login" aria-label="Перейти на страницу входа">
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Войти в систему
                                </Button>
                            </Link>
                        </footer>
                    </div>
                </Container>

            {/* Декоративные элементы */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
                <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>
        </div>
        </>
    )
}

