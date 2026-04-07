import {api} from "@/shared/api/axiosInstance";

export const getRelevantRequests = async (id:number, data: {page: number, size:number}) => {
    const response = await api.get(`/accommodations/${id}/relevant-requests`, {
        params: {
            page: data.page ?? 0,
            size: data.size ?? 20,
        }
    });
    return response.data;
}