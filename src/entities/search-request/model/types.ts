import {Dictionary} from "@/entities/dictionary/model/types";
import {District} from "@/entities/district/model/types";

export enum SearchRequestStatus {
    OPEN_TO_PRICE_REQUEST = "OPEN_TO_PRICE_REQUEST",
    PRICE_REQUEST_PENDING = "PRICE_REQUEST_PENDING",
    WAIT_TO_RESERVATION = "WAIT_TO_RESERVATION",
    FINISHED = "FINISHED",
}

export interface SearchRequest {
    id: number;
    authorId: number;
    authorName: string;
    fromRating: number;
    toRating: number;
    checkInDate: string;
    checkOutDate: string;
    oneNight: boolean;
    price: number;
    countOfPeople: number;
    status: SearchRequestStatus;
    unitTypes: string[];
    districts: District;
    services: Dictionary[];
    conditions: Dictionary[];
    expiresAt?: string;
}