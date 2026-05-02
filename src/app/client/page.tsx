"use client";

import { Button } from "@/shared/ui/button";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { Container } from "@/shared/ui/container";

export default function ClientPage() {
    return (
        <Container className="mt-8 sm:mt-16 md:mt-30">
            <main className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
                <section className="space-y-3 sm:space-y-4 animate-fade-in">
                    <div
                        className="text-4xl sm:text-5xl md:text-6xl mb-2"
                        aria-hidden="true"
                    >
                        🏠
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                        Welcome!
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto px-2">
                        Find the perfect place to stay. Cozy apartments,
                        beautiful homes, and modern studios await you
                    </p>
                </section>

                <section className="py-4 sm:py-6 md:py-8">
                    <h2 className="sr-only">Why use our service</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 list-none p-0 m-0">
                        <li className="p-3 sm:p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div
                                className="text-2xl sm:text-3xl mb-2"
                                aria-hidden="true"
                            >
                                ✨
                            </div>
                            <h3 className="font-semibold text-foreground text-sm sm:text-base">
                                Easy to find
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Simple search with your filters
                            </p>
                        </li>
                        <li className="p-3 sm:p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div
                                className="text-2xl sm:text-3xl mb-2"
                                aria-hidden="true"
                            >
                                💰
                            </div>
                            <h3 className="font-semibold text-foreground text-sm sm:text-base">
                                Great prices
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Deals and discounts
                            </p>
                        </li>
                        <li className="p-3 sm:p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1">
                            <div
                                className="text-2xl sm:text-3xl mb-2"
                                aria-hidden="true"
                            >
                                ⭐
                            </div>
                            <h3 className="font-semibold text-foreground text-sm sm:text-base">
                                Quality
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Verified hosts and reviews
                            </p>
                        </li>
                    </ul>
                </section>

                <section className="pt-2 sm:pt-4">
                    <Link href="/client/search">
                        <Button
                            size="lg"
                            className="bg-rose-600 hover:bg-rose-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto"
                            aria-label="Go to housing search"
                        >
                            <Search
                                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                                aria-hidden="true"
                            />
                            Start search
                            <ArrowRight
                                className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                aria-hidden="true"
                            />
                        </Button>
                    </Link>
                </section>

                <section className="pt-4 sm:pt-6 md:pt-8 border-t border-border">
                    <p className="text-xs sm:text-sm text-muted-foreground px-2">
                        5,000+ listings across Kazakhstan
                    </p>
                </section>
            </main>

            <div
                className="fixed inset-0 pointer-events-none overflow-hidden"
                aria-hidden="true"
            >
                <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-rose-800/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>
        </Container>
    );
}
