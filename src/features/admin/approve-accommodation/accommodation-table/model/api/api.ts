import {api} from "@/shared/api/axiosInstance";
import {AccommodationSearchCredentials} from "@/features/admin/approve-accommodation/accommodation-table/model/types";

export const getAccommodation = async (data:AccommodationSearchCredentials) => {
    const response = await api.get("/accommodations/search", {
        params: {
            cityId: data.cityId ?? "",
            districtId: data.districtId ?? "",
            approved: data.approved ?? "",
            isDeleted: data.isDeleted ?? "",
            minRating: data.minRating ?? "",
            ownerId: data.ownerId ?? "",
            name: data.name ?? "",
            page: data.page ?? 0,
            size: 20,
        }
    });

    return response.data;
};

export const approveAccommodation = async (id: string) => {
    const response = await api.patch(`/accommodations/${id}/approve`);

    return response.data;
}

export const rejectAccommodation = async (id: string) => {
    const response = await api.patch(`/accommodations/${id}/reject`);

    return response.data;
}

export const getAccommodationById = async (id: string) => {
    const response = await api.get(`/accommodations/${id}`);

    return response.data;
}