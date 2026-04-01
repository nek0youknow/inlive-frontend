import {api} from "@/shared/api/axiosInstance";

export const cancelRequestApi = async (id:number) => {
    const response = await api.patch(`/search-requests/${id}/cancel`);

    return response.data;
}