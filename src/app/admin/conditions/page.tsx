import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {ConditionTable} from "@/features/admin/manage-conditions/condition-table/ui/ConditionTable";
import {ConditionFilter} from "@/features/admin/manage-conditions/filter-condition/ui/ConditionFIlter";

export default function AdminConditionsPage() {
    return <>
        <BreadcrumbLayout
            items={[
                { label: "Админ", href: "/admin" },
                { label: "Условия", href: "/admin/conditions" }
            ]}
        />
        <ConditionFilter />
        <ConditionTable />
    </>;
}