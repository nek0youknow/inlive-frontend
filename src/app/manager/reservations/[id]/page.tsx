import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import BookingTable from "@/features/manager/bookings/booking-table/ui/BookingTable";

interface ReservationPageProps {
    params: {id: string}
}

export default async function ReservationPage({params}:ReservationPageProps) {
    const {id} = await params;

    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Менеджер", href: "/manager" },
                    { label: "Бронирования", href: "/manager/reservations" },
                    { label: id, href: `/manager/reservations/${id}`},
                ]}
            />
            <BookingTable accId={Number(id)} />
        </>
    )
}