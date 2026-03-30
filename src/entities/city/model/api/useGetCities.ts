import {useQuery} from "@tanstack/react-query";
import {getCities} from "@/entities/city/model/api/api";

export function useGetCities() {

    return useQuery({
        queryKey: ["cities"],
        queryFn: async () => getCities()
    })
}