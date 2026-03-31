import {api} from "@/shared/api/axiosInstance";

export const getDistricts = async () => {
    const response = await api.get("/districts");
    return response.data;
}

export const getDistrictByCityId = async (cityId: number) => {
    const response = await api.get(`/districts/by-city/${cityId}`);

    return response.data;
}