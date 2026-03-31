'use client'
import {Building2} from "lucide-react";
import {ReservationItem} from "@/features/client/reservations/reservation-list/ui/MyReservationItem";
import {useMyReservations} from "@/features/client/reservations/reservation-list/model/api/useMyReservations";
import {Spinner} from "@/shared/ui/spinner";
import {Reservation} from "@/entities/reservation/model/types";
import {useEffect, useRef} from "react";

export function MyReservationList() {
    const {
        data,
        isError,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useMyReservations();

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
                <p className="text-red-600">Ошибка загрузки бронирований</p>
            </div>
        );
    }

    if (isLoading) {
        return <Spinner className={"w-full mx-auto size-7 my-10"} />;
    }

    // Объединяем все страницы в один массив
    const allReservations = data?.pages.flatMap((page) => page.content) || [];
    const totalCount = data?.pages[0]?.totalElements || 0;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-end mb-6">
                <span className="text-sm text-gray-600">
                    {totalCount} бронирований
                </span>
            </div>

            <div className="grid gap-4">
                {allReservations.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">У вас нет бронирований</p>
                    </div>
                ) : (
                    allReservations.map((reservation: Reservation) => (
                        <ReservationItem
                            key={reservation.id}
                            reservation={reservation}
                        />
                    ))
                )}
            </div>

            {/* Элемент для отслеживания скролла */}
            <div ref={observerTarget} className="h-10 flex items-center justify-center">
                {isFetchingNextPage && (
                    <Spinner className={"w-6 h-6"} />
                )}
            </div>
        </div>
    );
}