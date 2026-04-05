export interface CreateAccommodationRequest {
    cityId: string;
    districtId: string;
    rating: number;
    name: string;
    description: string;
    address: string;
    images: File[];
    serviceDictionaryIds: number[];
    conditionDictionaryIds: number[];
}