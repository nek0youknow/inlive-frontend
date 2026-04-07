import {api} from "@/shared/api/axiosInstance";

export const getPriceRequest = async (searchRequestId:number) => {
    const response = await api.get(`/price-requests/by-search-request/${searchRequestId}`);
    return response.data;
}