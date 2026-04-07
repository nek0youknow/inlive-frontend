import {
    AccommodationUnitSearchCredientials,
    UpdateAccommodationUnitDictionariesRequest,
    UpdateAccommodationUnitPhotosRequest,
    UpdateAccommodationUnitRequest,
    CreateTariffRequest,
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/types";
import {api} from "@/shared/api/axiosInstance";

export const getAccommodationUnits = async (id:string, data: AccommodationUnitSearchCredientials) => {
    const response = await api.get("/accommodation-units/search", {
        params: {
            accommodationId: id,
            unitTypeId: data.unitTypeId ?? "",
            isAvailable: data.isAvailable ?? "",
            isDeleted: data.isDeleted ?? "",
            name: data.name ?? "",
            minCapacity: data.minCapacity ?? "",
            maxCapacity: data.maxCapacity ?? "",
            minArea: data.minArea ?? "",
            maxArea: data.maxArea ?? "",
            page: data.page ?? 0,
            size: data.size ?? 20,
        }
    });

    return response.data;
};

export const getAccommodationUnitById = async (id: string) => {
    const response = await api.get(`/accommodation-units/${id}`);

    return response.data;
}

export const updateAccommodationUnit = async (data: UpdateAccommodationUnitRequest) => {
    const response = await api.put(`/accommodation-units/${data.id}`, {
        unitType: data.unitType,
        name: data.name,
        description: data.description,
        capacity: data.capacity,
        area: data.area,
        floor: data.floor,
        isAvailable: data.isAvailable,
    });

    return response.data;
};

export const updateAccommodationUnitDictionaries = async (data: UpdateAccommodationUnitDictionariesRequest) => {
    const response = await api.put(`/accommodation-units/${data.unitId}/dictionaries`, {
        serviceDictionaryIds: data.serviceDictionaryIds,
        conditionDictionaryIds: data.conditionDictionaryIds,
    });

    return response.data;
};

export const updateAccommodationUnitPhotos = async (data: UpdateAccommodationUnitPhotosRequest) => {
    const formData = new FormData();

    data.images.forEach((image) => {
        formData.append("images", image);
    });

    const response = await api.put(`/accommodation-units/${data.id}/photos`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

export const deleteAccommodationUnitPhoto = async (id: string, photoUrls: string[]) => {
    const response = await api.delete(`/accommodation-units/${id}/photos`, {
        data: photoUrls,
    });

    return response.data;
}

export const createTariff = async (unitId: string, data: CreateTariffRequest) => {
    const response = await api.post(`/accommodation-units/${unitId}/tariffs`, {
        price: data.price,
        currency: data.currency,
        rangeTypeId: data.rangeTypeId,
    });

    return response.data;
}
