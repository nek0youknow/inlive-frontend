"use client";
import {
    useAccommodationUnitFilter
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-filter/model/useAccommodationUnitFilter";
import {useQuery} from "@tanstack/react-query";
import {
    getAccommodationUnits
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/api";

export function useGetAccommodationUnits(id: string) {

    const {filters} = useAccommodationUnitFilter();


    return useQuery({
        queryKey: ["accommodation-units", filters],
        queryFn: async () => getAccommodationUnits(id, filters)
    })
}