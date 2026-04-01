import {api} from "@/shared/api/axiosInstance";

export const updateRequestPriceApi = async (id: number, price: number) => {
    const response = await api.patch(`/search-requests/${id}/price`, {price});
    return response.data;
}