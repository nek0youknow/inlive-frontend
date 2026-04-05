'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import {
    useGetReservationsByAccommodation
} from "@/features/manager/bookings/booking-table/model/api/useGetReservationsByAccommodation";
import {Spinner} from "@/shared/ui/spinner";
import {BookingStatusVariant} from "@/features/manager/bookings/booking-table/ui/BookingStatusVariant";
import {BookingBtnVariant} from "@/features/manager/bookings/booking-table/ui/BookingBtnVariant";
import {Reservation} from "@/entities/reservation/model/types";
import { formatDate } from "@/shared/lib/date/formateDate";
import { TablePagination } from "@/widgets/pagination/ui/TablePagination";
import { useBookingSearchFilter } from "../../filter-booking/model/BookingSearchFilter";

interface BookingTableProps {
    accId: number
}

function BookingTable({accId}:BookingTableProps) {

    const {data, isError, isLoading} = useGetReservationsByAccommodation(accId);

    const {filters, setFilter} = useBookingSearchFilter();

    if(isLoading) return <Spinner className={"w-full mx-auto size-7 my-6 sm:my-8 md:my-10"} />

    if (isError) return (
        <div>
            Error! <button onClick={() => window.location.reload()}>Reload</button>
        </div>
    )

    return (
        <>
            <Table className="w-full relative">
                <TableHeader>
                    <TableRow>
                        <TableHead>Клиент</TableHead>
                        <TableHead>
                            <div
                                className="flex items-center gap-2 cursor-pointer select-none"
                            >
                                Даты
                            </div>
                        </TableHead>
                        <TableHead>
                            <div
                                className="flex items-center gap-2 cursor-pointer select-none"
                            >
                                Юнит

                            </div>
                        </TableHead>
                        <TableHead>
                            <div
                                className="flex items-center gap-2 cursor-pointer select-none"
                            >
                                Цена

                            </div>
                        </TableHead>
                        <TableHead>
                            <div
                                className="flex items-center gap-2 cursor-pointer select-none"
                            >
                                Статус
                            </div>
                        </TableHead>
                        <TableHead className="text-center">Действия</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data?.content?.map((item:Reservation) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.clientName}</TableCell>
                            <TableCell>
                                {formatDate(item?.checkOutDate?.split('T')[0])} – {formatDate(item?.checkInDate?.split('T')[0])}
                            </TableCell>
                            <TableCell>
                                {item.accommodationUnitName}
                            </TableCell>
                            <TableCell>{item.price.toLocaleString("ru-RU")} тг</TableCell>
                            <TableCell>
                                <BookingStatusVariant status={item.status} />
                            </TableCell>
                            <TableCell className="text-center">
                                <BookingBtnVariant reservationId={item.id} status={item.status} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {data?.totalElements > 20 && (
                <div className="mt-4 sm:mt-6">
                  <TablePagination
                      page={filters.page ?? 0}
                      totalPages={data.totalPages}
                      size={filters.size ?? 0}
                      onPageChange={(newPage) => setFilter("page", newPage)}
                  />
                </div>
            )}
        </>
    )
}

export default BookingTable
