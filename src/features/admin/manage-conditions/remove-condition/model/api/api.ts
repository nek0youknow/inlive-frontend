import {api} from "@/shared/api/axiosInstance";

export const removeCondition = async (id: number) => {
    const response = await api.delete(`/dictionaries/${id}`);

    return response.data;
}