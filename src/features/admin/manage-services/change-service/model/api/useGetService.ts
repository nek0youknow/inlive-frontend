import { useQuery } from "@tanstack/react-query";
import {getService} from "@/features/admin/manage-services/change-service/model/api/api";

export function useGetService(id: number) {
    return useQuery({
        queryKey: ["condition", id],
        queryFn: async () => getService(id),
    });
}
