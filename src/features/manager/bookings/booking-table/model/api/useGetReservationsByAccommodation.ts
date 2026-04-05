import {useQuery} from "@tanstack/react-query";
import {getReservationsByAccommodation} from "@/features/manager/bookings/booking-table/model/api/api";
import { useBookingSearchFilter } from "../../../filter-booking/model/BookingSearchFilter";

export function useGetReservationsByAccommodation(accId: number) {

    const {filters} = useBookingSearchFilter();

    return useQuery({
        queryKey: ["reservations", filters],
        queryFn: async() => await getReservationsByAccommodation(accId, filters)
    })
}