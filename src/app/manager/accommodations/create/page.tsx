'use client';
import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {CreateAccommodation} from "@/features/manager/accommodations/create-accommodation/ui/CreateAccommodation";
export default function CreateAccommodationsPage() {
    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Менеджер", href: "/manager" },
                    { label: "Accommodations", href: "/manager/accommodations" },
                    { label: "Создание", href: "/manager/accommodations/create" },
                ]}
            />
            <CreateAccommodation />
        </>
    )
}