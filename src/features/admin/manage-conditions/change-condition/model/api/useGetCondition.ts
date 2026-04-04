import { useQuery } from "@tanstack/react-query";
import {getConditions} from "@/features/admin/manage-conditions/change-condition/model/api/api";

export function useGetCondition(id: number) {
    return useQuery({
        queryKey: ["condition", id],
        queryFn: async () => getConditions(id),
    });
}
