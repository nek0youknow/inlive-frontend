import {api} from "@/shared/api/axiosInstance";

export const getPriceRequestByRequestId = async (requestId: number) => {
    const response = await api.get(`/price-requests/by-search-request/${requestId}`);

    return response.data;
}

export const respondToPriceRequest = async (priceRequestId: number, status: "ACCEPTED" | "REJECTED") => {
    const response = await api.patch(`/price-requests/${priceRequestId}/respond`, {
        clientResponseStatus: status
    });
    return response.data;
}
