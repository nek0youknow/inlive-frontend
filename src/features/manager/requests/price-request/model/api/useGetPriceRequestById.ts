"use client"
import {useQuery} from "@tanstack/react-query";
import {getPriceRequest} from "@/features/manager/requests/price-request/model/api/api";

export function useGetPriceRequestById(reqId: number, enabled: boolean = true) {
    return useQuery({
        queryKey: ['price-request', reqId],
        queryFn: async () => getPriceRequest(reqId),
        enabled, // ← Запрос выполняется только когда enabled = true
    })
}