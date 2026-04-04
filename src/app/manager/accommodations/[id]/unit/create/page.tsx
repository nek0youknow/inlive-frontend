
import {
    CreateAccommodationUnit
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/ui/CreateAccommodationUnit";
import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";

interface UnitPageProps {
    params: {
        id: string;
    }
}

export default async function CreateUnitPage({params}:UnitPageProps) {
    const {id} = await params;


    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Менеджер", href: "/manager" },
                    { label: "Accommodations", href: "/manager/accommodations" },
                    { label: id, href: `/manager/accommodations/${id}`},
                    { label: "Создание юнита", href: `/manager/accommodations/${id}/unit/create`}
                ]}
            />
            <CreateAccommodationUnit accommodationId={id} />
        </>
    )
}