import {useQuery} from "@tanstack/react-query";
import {getRelevantAccUnits} from "@/features/manager/requests/create-price-request/model/api/api";

export function useRelevantAccUnits(accId:number, reqId:number) {

    return useQuery({
        queryKey: ['relevant-acc-units'],
        queryFn: async () => getRelevantAccUnits(accId, reqId),
    })
}