import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {AccommodationList} from "@/widgets/manage-list-accommodations/accommodations-list/ui/AccommodationList";
import {
    ManagerAccommodationFilterPanel
} from "@/widgets/manage-list-accommodations/accommodations-filter/ui/ManagerAccommodationFilterPanel";

export default function ManagerBookingsPage() {
  return (
      <>
        <BreadcrumbLayout
            items={[
                { label: "Менеджер", href: "/manager" },
              { label: "Бронирования", href: "/manager/reservations" }
            ]}
        />
          <ManagerAccommodationFilterPanel hasAddButton={false} />
          <AccommodationList hrefPattern="/manager/reservations/{id}" />
      </>
  );
}
