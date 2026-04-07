import {useQuery} from "@tanstack/react-query";
import {
    getAccommodationById
} from "@/features/manager/accommodations/accommodation-profile/model/api/api";

export function useGetAccommodationById(id: string) {

    return useQuery({
        queryKey: ["accommodation"],
        queryFn: async() => await getAccommodationById(Number(id))
    })
}