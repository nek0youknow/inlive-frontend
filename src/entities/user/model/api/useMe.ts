import {useQuery} from "@tanstack/react-query";
import {getMe} from "@/entities/user/model/api/api";

export function useMe() {
    return useQuery({
        queryKey: ["user", "me"],
        queryFn: async () => await getMe(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}

