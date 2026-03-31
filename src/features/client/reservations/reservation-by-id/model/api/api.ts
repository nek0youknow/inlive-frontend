import {api} from "@/shared/api/axiosInstance";

export const getReservationById = async (id:number) => {
    const response = await api.get(`/reservations/${id}`);

    return response.data;
};

export const cancelReservationApi = async (id: number) => {
    const response = await api.patch(`/reservations/${id}/cancel`);

    return response.data;
};