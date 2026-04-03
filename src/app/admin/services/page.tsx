import {ServicesTable} from "@/features/admin/manage-services/table-services/ui/ServicesTable";
import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {ServicesFilter} from "@/features/admin/manage-services/filter-services/ui/ServicesFIlter";

export default function AdminServicesPage() {
    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Админ", href: "/admin" },
                    { label: "Услуги", href: "/admin/services" }
                ]}
            />
            <ServicesFilter />
            <ServicesTable />
        </>
    );
}