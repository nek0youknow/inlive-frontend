import {PaginationParams} from "@/shared/types/params";

export interface AccommodationRequest extends PaginationParams {
    cityId?: string | null;
    districtId?: string | null;
    approved?: string | null;
    isDeleted?: string | null;
    minRating?: string | null;
    ownerId?: string | null;
    name?: string | null;
}