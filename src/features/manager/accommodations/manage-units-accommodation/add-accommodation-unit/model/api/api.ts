import {
    IAddAccommodationUnitForm
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/model/types";
import {api} from "@/shared/api/axiosInstance";

export const createAccommodationUnit = async (data: IAddAccommodationUnitForm) => {
    const formData = new FormData();

    formData.append("accommodationId", data.accommodationId);
    formData.append("unitType", data.unitType);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("capacity", String(data.capacity));
    formData.append("area", String(data.area));
    formData.append("floor", String(data.floor));
    data.serviceDictionaryIds.forEach((service) => {
        formData.append("serviceDictionaryIds", String(service));
    })
    data.conditionDictionaryIds.forEach((condition) => {
        formData.append("conditionDictionaryIds", String(condition));
    })
    data.images.forEach((image) => {
        formData.append("images", image);
    });

    const response = await api.post("/accommodation-units", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};