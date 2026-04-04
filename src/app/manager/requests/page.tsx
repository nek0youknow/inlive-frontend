import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {AccommodationList} from "@/widgets/manage-list-accommodations/accommodations-list/ui/AccommodationList";
import {
    ManagerAccommodationFilterPanel
} from "@/widgets/manage-list-accommodations/accommodations-filter/ui/ManagerAccommodationFilterPanel";

export default function ClientAccommodationsPage() {
    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Главная", href: "/manager" },
                    { label: "Заявки по Accommodation", href: "/manager/requests" }
                ]}
            />
            <ManagerAccommodationFilterPanel hasAddButton={false} />
            <AccommodationList hrefPattern="/manager/requests/{id}" />
        </>
    )
}
