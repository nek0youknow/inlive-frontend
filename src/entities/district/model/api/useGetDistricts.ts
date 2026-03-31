import {useQuery} from "@tanstack/react-query";
import {getDistrictByCityId, getDistricts} from "@/entities/district/model/api/api";

export function useGetDistricts(cityId?: number | null) {

    return useQuery({
        queryKey: ["districts", cityId],
        queryFn: () => (cityId ? getDistrictByCityId(cityId) : getDistricts()),
    })
}