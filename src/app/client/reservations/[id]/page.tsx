import {ReservationById} from "@/features/client/reservations/reservation-by-id/ui/ReservationById";
import {Suspense} from "react";
import {Spinner} from "@/shared/ui/spinner";

interface ReservationPageProps {
    params: Promise<{id: string}>
}

export default async function ReservationPage({params}:ReservationPageProps) {
    const {id} = await params;

    return (
        <Suspense fallback={<Spinner className={"w-full mx-auto size-7 my-10"} />}>
            <ReservationById id={Number(id)} />
        </Suspense>
    )
}