"use client"
import { Button } from "@/shared/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
            <div className="max-w-md text-center">
                <Image
                    src="/not-found.svg"
                    alt="Страница не найдена"
                    width={300}
                    height={180}
                    className="mx-auto mb-6"
                />

                <h2 className="text-2xl font-bold mb-3">
                    Страница не найдена
                </h2>

                <p className="text-muted-foreground text-xs mb-8">
                    Кажется, мы не можем найти страницу, которую вы ищете. Возможно, адрес был введен неправильно или страница была перемещена.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size={"sm"}
                        variant="outline"
                        onClick={() => router.back()}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Вернуться назад
                    </Button>

                    <Button size={"sm"} asChild>
                        <Link href="/public" className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            На главную
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}