import {api} from "@/shared/api/axiosInstance";
import {PriceRequestCredetials} from "@/features/manager/requests/create-price-request/model/types";

export const getRelevantAccUnits = async (accId:number, reqId:number) => {
    const response = await api.get(`/accommodation-units/${accId}/by-request/${reqId}`);

    return response.data;
}

export const createPriceRequest = async (data:PriceRequestCredetials) => {
    const response = await api.post(`/price-requests`, data);

    return response.data;
}