import {api} from "@/shared/api/axiosInstance";
import {Reservation} from "@/entities/reservation/model/types";

export interface PaginatedReservationsResponse {
    content: Reservation[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export const getMyReservations = async (page: number = 0, size: number = 5): Promise<PaginatedReservationsResponse> => {
    const response = await api.get("/reservations/my", {
        params: {
            page,
            size,
            sortDirection: "DESC",
        },
    });

    return response.data;
};