import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import { ShieldCheck } from "lucide-react";

export default function Admin() {
    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Админ", href: "/admin" }
                ]}
            />
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <ShieldCheck className="h-24 w-24 text-primary mb-6" />
                <h1 className="text-3xl font-bold mb-4">Панель администратора</h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-md">
                    Добро пожаловать в административную панель. Используйте боковое меню для навигации между разделами.
                </p>
            </div>
        </>
    )
}