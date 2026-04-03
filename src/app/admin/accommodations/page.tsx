import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {
    AccommodationTable
} from "@/features/admin/approve-accommodation/accommodation-table/ui/AccommodationTable";
import {
    AccommodationSearchInput
} from "@/features/admin/approve-accommodation/filter-accommodation/ui/AccommodationSearchInput";

export default function AdminAccommodationsPage() {
  return (
      <>
        <BreadcrumbLayout
            items={[
              { label: "Админ", href: "/admin" },
              { label: "Accommodations", href: "/admin/accommodations" }
            ]}
        />
          <AccommodationSearchInput />
          <AccommodationTable />
      </>
  );
}