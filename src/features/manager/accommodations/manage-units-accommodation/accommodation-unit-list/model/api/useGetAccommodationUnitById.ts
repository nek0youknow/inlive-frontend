import {useQuery} from "@tanstack/react-query";
import {
    getAccommodationUnitById
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/api";

export function useGetAccommodationUnitById(id: string, enabled = true) {
    return useQuery({
        queryKey: ["accommodation-unit", id],
        queryFn: () => getAccommodationUnitById(id),
        enabled: !!id && enabled,
    });
}
