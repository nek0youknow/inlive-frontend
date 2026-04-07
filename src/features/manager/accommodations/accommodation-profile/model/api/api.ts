import {api} from "@/shared/api/axiosInstance";

export const getAccommodationById = async (id:number) => {
    const response = await api.get(`/accommodations/${id}`);

    return response.data;
}