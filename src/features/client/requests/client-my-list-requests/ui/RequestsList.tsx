"use client"
import {useMySearchRequests} from "@/features/client/requests/client-my-list-requests/model/api/useMySearchRequests";
import {RequestInfo} from "@/features/client/requests/client-my-list-requests/ui/RequestInfo";
import {SearchRequest} from "@/entities/search-request/model/types";
import {Spinner} from "@/shared/ui/spinner";
import {RequestItemLink} from "@/features/client/requests/client-my-list-requests/ui/RequestItemLink";
import {useEffect, useRef, useCallback} from "react";

export function RequestsList() {
    const {
        data,
        isError,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useMySearchRequests();

    // Intersection Observer для бесконечного скролла
    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isError) {
        return (
            <div className="text-center py-10">
                <p className="text-red-600">Ошибка загрузки запросов</p>
            </div>
        );
    }

    if (isLoading) {
        return <Spinner className={"w-full mx-auto size-7 my-10"} />;
    }

    // Объединяем все страницы в один массив
    const allRequests = data?.pages.flatMap((page) => page.content) || [];

    if (allRequests.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-600">У вас пока нет запросов</p>
            </div>
        );
    }

    return (
        <div className={"flex flex-col gap-6 sm:gap-8 md:gap-10"}>
            {allRequests.map((request: SearchRequest) => (
                <RequestItemLink key={request.id} requestId={request.id}>
                    <RequestInfo request={request} />
                </RequestItemLink>
            ))}
            
            {/* Элемент для отслеживания скролла */}
            <div ref={observerTarget} className="h-10 flex items-center justify-center">
                {isFetchingNextPage && (
                    <Spinner className={"w-6 h-6"} />
                )}
            </div>
        </div>
    );
}
