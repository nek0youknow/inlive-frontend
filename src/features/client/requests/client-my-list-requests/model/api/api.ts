import { SearchRequest } from "@/entities/search-request/model/types";
import {api} from "@/shared/api/axiosInstance";

export interface PaginatedSearchRequestsResponse {
    content: SearchRequest[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export const getMySearchRequests = async (page: number = 0, size: number = 5): Promise<PaginatedSearchRequestsResponse> => {
    const response = await api.get("/search-requests/my", {
        params: {
            page,
            size,
            sortDirection: "DESC",
        },
    });

    return response.data;
}