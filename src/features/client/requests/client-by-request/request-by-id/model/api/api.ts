import {api} from "@/shared/api/axiosInstance";

export const getSearchRequestById = async (id:string | number) => {
    const response = await api.get(`/search-requests/${id}`);

    return response.data;
}
