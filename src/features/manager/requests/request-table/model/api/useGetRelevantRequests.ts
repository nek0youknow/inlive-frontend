import {useQuery} from "@tanstack/react-query";
import {getRelevantRequests} from "@/features/manager/requests/request-table/model/api/api";
import { useRequestFilter } from "../../../filter-request/model/useRequestFilter";

export function useGetRelevantRequests(id:number) {

    const {filters} = useRequestFilter();

    return useQuery({
        queryKey: ['relevant-requests', filters],
        queryFn: async () => await getRelevantRequests(id, filters),
        staleTime: 30000, // Кешировать данные на 30 секунд
    })
}