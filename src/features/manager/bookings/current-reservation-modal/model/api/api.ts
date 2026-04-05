import {api} from "@/shared/api/axiosInstance";


export const getReservationById = async (resId: number) => {
    const response = await api.get(`/reservations/${resId}`);

    return response.data;
}

export const changeReservationFinalStatus = async (reservationId:number, status:string) => {
    const response = await api.put(`/reservations/${reservationId}/final-status`, {status});

    return response.data;
}