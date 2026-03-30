import {api} from "@/shared/api/axiosInstance";

export const getCities = async () => {
    const response = await api.get("/cities");
    return response.data;
}