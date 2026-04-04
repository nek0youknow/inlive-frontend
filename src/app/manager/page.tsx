import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {ShieldCheck} from "lucide-react";

export default function SuperManagerPage() {
    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Менеджер", href: "/manager" }
                ]}
            />
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <ShieldCheck className="h-24 w-24 text-primary mb-6" />
                <h1 className="text-3xl font-bold mb-4">Панель менеджера</h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-md">
                    Добро пожаловать в панель менеджера. Используйте боковое меню для управления разделами и задачами.
                </p>
            </div>

        </>
    )
}