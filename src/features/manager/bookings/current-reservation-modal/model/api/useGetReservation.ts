import {useQuery} from "@tanstack/react-query";
import {getReservationById} from "@/features/manager/bookings/current-reservation-modal/model/api/api";

export function useGetReservation(reservationId: number, isOpen: boolean){
    return useQuery({
        queryKey: ["reservation"],
        queryFn: async() => getReservationById(reservationId),
        enabled: isOpen
    })
}