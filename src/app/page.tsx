"use client"
import { Button } from "@/shared/ui/button"
import { Search, Users } from "lucide-react"
import Link from "next/link"
import { Container } from "@/shared/ui/container"
import { useEffect } from "react"

export default function LandingPage() {
    // Структурированные данные для SEO
    useEffect(() => {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
        
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "UI Tap",
            "description": "Платформа для поиска и управления жильем в Казахстане",
            "url": baseUrl,
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${baseUrl}/client/search`
                },
                "query-input": "required name=search_term_string"
            },
            "publisher": {
                "@type": "Organization",
                "name": "UI Tap",
                "url": baseUrl
            }
        }

        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.text = JSON.stringify(structuredData)
        document.head.appendChild(script)

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script)
            }
        }
    }, [])

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-green-50">
                <Container className="pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-20">
                    <main className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 sm:space-y-12">
                        <section className="space-y-4 sm:space-y-6 animate-fade-in">
                            <div className="text-5xl sm:text-6xl md:text-7xl mb-4" aria-hidden="true">🏠</div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900">
                                Добро пожаловать в
                                <span className="block text-green-600 mt-2">UI Tap</span>
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto px-2">
                                Платформа для поиска и управления жильем. Найдите идеальное место для отдыха или управляйте своими объектами недвижимости.
                            </p>
                        </section>

                        <section className="pt-6 sm:pt-8" aria-label="Призыв к действию">
                            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Готовы начать?
                                </h2>
                                <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-xl mx-auto">
                                    Присоединяйтесь к тысячам пользователей, которые уже нашли свое идеальное жилье
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/auth/login" aria-label="Войти в систему">
                                        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                                            <Search className="w-5 h-5 mr-2" aria-hidden="true" />
                                            Войти в систему
                                        </Button>
                                    </Link>
                                    <Link href="/auth/register" aria-label="Зарегистрироваться">
                                        <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-semibold w-full sm:w-auto">
                                            <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                                            Зарегистрироваться
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </section>

                        <section className="py-6 sm:py-8" aria-label="Преимущества платформы">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                                Почему выбирают нас?
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                                <article className="p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <div className="text-3xl sm:text-4xl mb-3" aria-hidden="true">🔍</div>
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Удобный поиск</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">Быстрый поиск по множеству критериев</p>
                                </article>
                                <article className="p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <div className="text-3xl sm:text-4xl mb-3" aria-hidden="true">💰</div>
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Лучшие цены</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">Выгодные предложения и скидки</p>
                                </article>
                                <article className="p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <div className="text-3xl sm:text-4xl mb-3" aria-hidden="true">⭐</div>
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Качество</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">Проверенные объекты и отзывы</p>
                                </article>
                                <article className="p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <div className="text-3xl sm:text-4xl mb-3" aria-hidden="true">🛡️</div>
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Безопасность</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">Надежная платформа для всех</p>
                                </article>
                            </div>
                        </section>

                        <section className="py-6 sm:py-8 border-t border-gray-200" aria-label="Статистика платформы">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                                <div className="text-center">
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-2">5000+</div>
                                    <p className="text-sm sm:text-base text-gray-600">Объектов недвижимости</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-2">1000+</div>
                                    <p className="text-sm sm:text-base text-gray-600">Довольных клиентов</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600 mb-2">24/7</div>
                                    <p className="text-sm sm:text-base text-gray-600">Поддержка клиентов</p>
                                </div>
                            </div>
                        </section>
                    </main>
                </Container>

                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
                    <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
            </div>
        </>
    )
}
