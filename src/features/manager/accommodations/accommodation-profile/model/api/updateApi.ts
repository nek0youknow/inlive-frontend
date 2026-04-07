import {api} from "@/shared/api/axiosInstance";

export interface UpdateAccommodationMainInfoRequest {
    id: number;
    name: string;
    description: string;
    address: string;
    cityId: string;
    districtId: string;
    rating: number;
}

export interface UpdateAccommodationTagsRequest {
    id: number;
    serviceIds: number[];
    conditionIds: number[];
}

export interface UpdateAccommodationPhotosRequest {
    id: number;
    images: File[];
}

export const updateAccommodationMainInfo = async (data: UpdateAccommodationMainInfoRequest) => {
    const response = await api.put(`/accommodations/${data.id}/main-info`, {
        name: data.name,
        description: data.description,
        address: data.address,
        cityId: data.cityId,
        districtId: data.districtId,
        rating: data.rating,
    });

    return response.data;
};

export const updateAccommodationTags = async (data: UpdateAccommodationTagsRequest) => {
    const response = await api.put(`/accommodations/${data.id}/dictionaries`, {
        serviceDictionaryIds: data.serviceIds,
        conditionDictionaryIds: data.conditionIds,
    });

    return response.data;
};

export const updateAccommodationPhotos = async (data: UpdateAccommodationPhotosRequest) => {
    const formData = new FormData();
    
    data.images.forEach((image) => {
        formData.append("images", image);
    });

    const response = await api.put(`/accommodations/${data.id}/photos`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};



export const deleteAccommodationPhoto = async (id: string, photoUrls: string[]) => {
    const response = await api.delete(`/accommodations/${id}/photos`, {
        data: photoUrls,
    });

    return response.data;
};
