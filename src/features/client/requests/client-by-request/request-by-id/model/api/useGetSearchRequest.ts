import { useQuery } from "@tanstack/react-query";
import {getSearchRequestById} from "@/features/client/requests/client-by-request/request-by-id/model/api/api";

export function useGetSearchRequest(id: string | number) {
    return useQuery({
        queryKey: ["search-request", id],
        queryFn: async () => await getSearchRequestById(id),
        enabled: !!id,
        retry: 1,
        staleTime: 30000, // Кешировать данные на 30 секунд
    });
}