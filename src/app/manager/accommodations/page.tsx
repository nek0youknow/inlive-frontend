import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {
    ManagerAccommodationFilterPanel
} from "@/widgets/manage-list-accommodations/accommodations-filter/ui/ManagerAccommodationFilterPanel";
import {AccommodationList} from "@/widgets/manage-list-accommodations/accommodations-list/ui/AccommodationList";

export default function ManagerAccommodationsPage() {
    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Менеджер", href: "/manager" },
                    { label: "Accommodations", href: "/manager/accommodations" }
                ]}
            />
            <ManagerAccommodationFilterPanel hasAddButton={true} />
            <AccommodationList />
        </>
    )
}