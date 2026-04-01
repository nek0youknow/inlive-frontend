"use client"
import {useInfiniteQuery} from "@tanstack/react-query";
import {getMySearchRequests} from "@/features/client/requests/client-my-list-requests/model/api/api";

const PAGE_SIZE = 5;

export function useMySearchRequests() {
    return useInfiniteQuery({
        queryKey: ["search-requests", "infinite"],
        queryFn: ({ pageParam = 0 }) => getMySearchRequests(pageParam, PAGE_SIZE),
        getNextPageParam: (lastPage) => {
            if (lastPage.last) {
                return undefined;
            }
            return lastPage.page + 1;
        },
        initialPageParam: 0,
    });
}