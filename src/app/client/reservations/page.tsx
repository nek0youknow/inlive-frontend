import {MyReservationList} from "@/features/client/reservations/reservation-list/ui/MyReservationList";
import {Container} from "@/shared/ui/container";

export default function ReservationsPage() {
    return (
        <Container className={"my-10"}>
            <h1 className="text-3xl my-10 text-center font-bold">Мои бронирования</h1>
            <MyReservationList />
        </Container>
    )
}