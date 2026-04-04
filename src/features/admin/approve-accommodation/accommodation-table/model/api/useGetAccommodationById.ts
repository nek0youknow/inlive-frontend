import { useQuery } from "@tanstack/react-query";
import { getAccommodationById } from "@/features/admin/approve-accommodation/accommodation-table/model/api/api";

export function useGetAccommodationById(id?: string | null) {
    return useQuery({
        queryKey: ["accommodation", id],
        queryFn: async () => {
            if (!id) throw new Error("No ID provided");
            return getAccommodationById(id);
        },
        enabled: !!id,
    });
}
