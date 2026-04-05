import {api} from "@/shared/api/axiosInstance";

export const removeService = async (id: number) => {
    const response = await api.delete(`/dictionaries/${id}`);

    return response.data;
}