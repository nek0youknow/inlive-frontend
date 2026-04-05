"use client"
import {Button} from "@/shared/ui/button";
import {
    CurrentReservationModal
} from "@/features/manager/bookings/current-reservation-modal/ui/CurrentReservationModal";
import {usePutReservationStatus} from "@/features/manager/bookings/booking-table/model/api/usePutReservationStatus";

interface BookingBtnVariantProps {
    reservationId: number;
    status: string;
}

export function BookingBtnVariant({status, reservationId}:BookingBtnVariantProps){
    const {mutate} = usePutReservationStatus();

    const handleApprove = () => {
        mutate({ reservationId, status: "APPROVED" });
    };

    const handleReject = () => {
        mutate({ reservationId, status: "REJECTED" });
    };

    switch(status) {
        case "FINISHED_SUCCESSFUL": return null;
        case "WAITING_TO_APPROVE": return (
            <div className={"flex gap-2"}>
                <Button onClick={handleApprove} size="sm">Подтвердить</Button>
                <Button onClick={handleReject} size="sm" variant="outline">
                    Отмена
                </Button>
            </div>
        );
        case "APPROVED": return <CurrentReservationModal reservationId={reservationId} />;
        case "REJECTED": return null;
        case "CLIENT_DIDNT_CAME": return null
    }
}