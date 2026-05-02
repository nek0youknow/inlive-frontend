"use client";

import { Button } from "@/shared/ui/button";
import { ArrowRight, Building2, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { useEffect } from "react";

export default function RegisterSelectionPage() {
    useEffect(() => {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Sign up for UI Tap",
            description:
                "Registration for clients and property managers on UI Tap",
            url: typeof window !== "undefined" ? window.location.href : "",
            inLanguage: "en-US",
            isPartOf: {
                "@type": "WebSite",
                name: "UI Tap",
                url: typeof window !== "undefined" ? window.location.origin : "",
            },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item:
                            typeof window !== "undefined"
                                ? `${window.location.origin}/`
                                : "",
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Registration",
                        item:
                            typeof window !== "undefined"
                                ? window.location.href
                                : "",
                    },
                ],
            },
            mainEntity: {
                "@type": "ItemList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Client registration",
                        description: "Sign up to search and book housing",
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Manager registration",
                        description: "Sign up to manage property listings",
                    },
                ],
            },
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <>
            <div className="sr-only">
                <h1>Sign up for UI Tap — choose account type</h1>
            </div>

            <div className="min-h-screen bg-gradient-to-br from-rose-950/50 via-rose-950/30 to-rose-950/50 flex items-center justify-center py-8 sm:py-12">
                <Container>
                    <div className="max-w-3xl mx-auto px-4 sm:px-6">
                        <nav aria-label="Navigation">
                            <Link
                                href="/"
                                className="inline-flex items-center text-sm sm:text-base text-muted-foreground hover:text-foreground mb-6 sm:mb-8 transition-colors"
                            >
                                <ArrowLeft
                                    className="w-4 h-4 mr-2"
                                    aria-hidden="true"
                                />
                                Back to home
                            </Link>
                        </nav>

                        <header className="text-center mb-8 sm:mb-12">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                                Choose registration type
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
                                Pick the role that best describes you to get
                                started
                            </p>
                        </header>

                        <section aria-label="Registration options">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
                                <Link
                                    href="/auth/client/register"
                                    className="group"
                                    aria-label="Register as a client"
                                >
                                    <article className="p-8 sm:p-10 bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col items-center text-center">
                                        <div
                                            className="w-20 h-20 sm:w-24 sm:h-24 bg-rose-900/50 rounded-full flex items-center justify-center mb-6 group-hover:bg-rose-800/30 transition-colors"
                                            aria-hidden="true"
                                        >
                                            <Home className="w-10 h-10 sm:w-12 sm:h-12 text-rose-400" />
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                                            Client
                                        </h2>
                                        <p className="text-sm sm:text-base text-muted-foreground mb-6 flex-grow">
                                            Looking for a place to stay?
                                            Register as a client to access
                                            thousands of listings across
                                            Kazakhstan.
                                        </p>
                                        <ul className="text-left text-sm sm:text-base text-muted-foreground mb-6 space-y-2 w-full">
                                            <li className="flex items-start">
                                                <span className="text-rose-400 mr-2">
                                                    ✓
                                                </span>
                                                Search with your criteria
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-rose-400 mr-2">
                                                    ✓
                                                </span>
                                                Book and manage requests
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-rose-400 mr-2">
                                                    ✓
                                                </span>
                                                View booking history
                                            </li>
                                        </ul>
                                        <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                                            Register
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </article>
                                </Link>

                                <Link
                                    href="/auth/manager/register"
                                    className="group"
                                    aria-label="Register as a manager"
                                >
                                    <article className="p-8 sm:p-10 bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col items-center text-center">
                                        <div
                                            className="w-20 h-20 sm:w-24 sm:h-24 bg-rose-900/50 rounded-full flex items-center justify-center mb-6 group-hover:bg-rose-800/30 transition-colors"
                                            aria-hidden="true"
                                        >
                                            <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-rose-400" />
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                                            Manager
                                        </h2>
                                        <p className="text-sm sm:text-base text-muted-foreground mb-6 flex-grow">
                                            Manage properties? Register as a
                                            manager to get tools for listings,
                                            requests, and more.
                                        </p>
                                        <ul className="text-left text-sm sm:text-base text-muted-foreground mb-6 space-y-2 w-full">
                                            <li className="flex items-start">
                                                <span className="text-rose-400 mr-2">
                                                    ✓
                                                </span>
                                                Manage property listings
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-rose-400 mr-2">
                                                    ✓
                                                </span>
                                                Handle client requests
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-rose-400 mr-2">
                                                    ✓
                                                </span>
                                                Manage pricing and availability
                                            </li>
                                        </ul>
                                        <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                                            Register
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </article>
                                </Link>
                            </div>
                        </section>

                        <footer className="text-center">
                            <p className="text-sm sm:text-base text-muted-foreground mb-4">
                                Already have an account?
                            </p>
                            <Link href="/auth/login" aria-label="Go to sign-in">
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                >
                                    Sign in
                                </Button>
                            </Link>
                        </footer>
                    </div>
                </Container>

                <div
                    className="fixed inset-0 pointer-events-none overflow-hidden z-0"
                    aria-hidden="true"
                >
                    <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-rose-800/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-rose-800/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
            </div>
        </>
    );
}
