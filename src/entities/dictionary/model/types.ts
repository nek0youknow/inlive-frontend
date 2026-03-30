import {PaginationParams} from "@/shared/types/params";

export interface Dictionary {
    id?: string;
    key: string;
    value: string;
}

export interface DictionaryCredentials extends PaginationParams {
    isDeleted: boolean | null;
    keys: string[] | null;
    value: string | null;
}


export interface DictionaryResponse {
    content: Dictionary[];
    page: number;
    size: string | number;
    sortBy?: string | null;
    sortDirection?: string | null
}