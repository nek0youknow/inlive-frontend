import {useInfiniteQuery} from "@tanstack/react-query";
import {getMyReservations} from "@/features/client/reservations/reservation-list/model/api/api";

const PAGE_SIZE = 5;

export function useMyReservations() {
    return useInfiniteQuery({
        queryKey: ["my-reservations", "infinite"],
        queryFn: ({ pageParam = 0 }) => getMyReservations(pageParam, PAGE_SIZE),
        getNextPageParam: (lastPage) => {
            if (lastPage.last) {
                return undefined;
            }
            return lastPage.page + 1;
        },
        initialPageParam: 0,
    });
}