import {PaginationParams} from "@/shared/types/params";

export interface AccommodationUnitSearchCredientials extends PaginationParams {
    accommodationId?: string | null;
    unitTypeId?: string | null;
    isAvailable?: string | null;
    isDeleted?: string | null;
    name?: string | null;
    minCapacity?: string | null;
    maxCapacity?: string | null;
    minArea?: string | null;
    maxArea?: string | null;
}

export interface UpdateAccommodationUnitRequest {
    id: string;
    unitType: string;
    name: string;
    description: string;
    capacity: number;
    floor: number;
    area: number;
    isAvailable: boolean;
    images?: File[];
}

export interface UpdateAccommodationUnitPhotosRequest {
    id: number;
    images: File[];
}

export interface UpdateAccommodationUnitDictionariesRequest {
    unitId: string;
    serviceDictionaryIds: number[];
    conditionDictionaryIds: number[];
}

export interface CreateTariffRequest {
    price: number;
    currency: string;
    rangeTypeId: number;
}