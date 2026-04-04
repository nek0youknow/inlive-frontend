import {api} from "@/shared/api/axiosInstance";
import {AccommodationRequest} from "@/widgets/manage-list-accommodations/accommodations-list/model/types";

export const getMyAccommodations = async (data: AccommodationRequest) => {
    const response = await api.get("/accommodations/owner/search", {
        params: {
            cityId: data.cityId ?? "",
            districtId: data.districtId ?? "",
            approved: data.approved ?? "",
            isDeleted: data.isDeleted ?? "",
            minRating: data.minRating ?? "",
            name: data.name ?? "",
            page: data.page ?? 0,
            size: data.size ?? 20,
        }
    })

    return response.data;
}