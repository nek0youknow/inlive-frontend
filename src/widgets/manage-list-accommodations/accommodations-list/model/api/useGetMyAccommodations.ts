"use client"
import {useQuery} from "@tanstack/react-query";
import {
    useMyAccommodationFilter
} from "@/widgets/manage-list-accommodations/accommodations-filter/model/store/useMyAccommodationFilter";
import {getMyAccommodations} from "@/widgets/manage-list-accommodations/accommodations-list/model/api/api";

export function useGetMyAccommodations() {
    const { filters } = useMyAccommodationFilter();

    return useQuery({
        queryKey: ["accommodations-list", filters],
        queryFn: async () => await getMyAccommodations(filters),
    });
}