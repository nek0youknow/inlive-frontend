import {api} from "@/shared/api/axiosInstance";

export const getReservationsByAccommodation = async (accId:number, data: {page: number, size: number}) => {
    const response = await api.get(`/reservations/by-accommodation/${accId}`, {
        params: {
            page: data.page ?? 0,
            size: data.size ?? 20
        }
    }
    );

    return response.data;
}

export const changeReservationStatus = async (reservationId:number, status:string) => {
    const response = await api.put(`/reservations/${reservationId}/status`, {status});

    return response.data;
}
