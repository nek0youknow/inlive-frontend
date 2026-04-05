import {CreateAccommodationRequest} from "@/features/manager/accommodations/create-accommodation/model/types";
import {api} from "@/shared/api/axiosInstance";

export const createAccommodation = async (data: CreateAccommodationRequest) => {
    const formData = new FormData();

    formData.append("cityId", data.cityId);
    formData.append("districtId", data.districtId);
    formData.append("rating", String(data.rating));
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("address", data.address);
    data.serviceDictionaryIds.forEach((service) => {
        formData.append("serviceDictionaryIds", String(service));
    })

    data.conditionDictionaryIds.forEach((condition) => {
        formData.append("conditionDictionaryIds", String(condition));
    })


    data.images.forEach((image) => {
        formData.append("images", image);
    });

    const response = await api.post("/accommodations", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}