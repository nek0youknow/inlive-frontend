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
