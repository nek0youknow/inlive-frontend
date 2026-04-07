'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Button } from "@/shared/ui/button"
import {formatDate, hoursLeft} from "@/shared/lib/date/formateDate";
import {useGetRelevantRequests} from "@/features/manager/requests/request-table/model/api/useGetRelevantRequests";
import {RequestStatusBadge} from "@/features/manager/requests/request-table/ui/RequestStatusBadge";
import {Spinner} from "@/shared/ui/spinner";
import {CreatePriceRequest} from "@/features/manager/requests/create-price-request/ui/CreatePriceRequest";
import {SearchRequest, SearchRequestStatus} from "@/entities/search-request/model/types";
import {PriceRequestModal} from "@/features/manager/requests/price-request/ui/PriceRequestModal";
import { TablePagination } from "@/widgets/pagination/ui/TablePagination";
import { useRequestFilter } from "../../filter-request/model/useRequestFilter";

interface RequestTableProps {
    id: number
}

function handleSearchRequestStatus(price?:number, status?: string, requestId?: number, accId?: number) {
    switch (status) {
        case SearchRequestStatus.OPEN_TO_PRICE_REQUEST:
            return <CreatePriceRequest price={price} accId={accId ?? 0}  requestId={requestId ?? 0} />;
        case SearchRequestStatus.PRICE_REQUEST_PENDING:
            return <PriceRequestModal requestId={requestId ?? 0}  />;
        case SearchRequestStatus.WAIT_TO_RESERVATION:
                return <Button disabled>Ожидание бронирования</Button>;
        case SearchRequestStatus.FINISHED:
            return <Button disabled>Завершено</Button>;
        default:
            return null;
    }
}


export function RequestTable({id}:RequestTableProps) {

    const {data: requests, isLoading ,isError} = useGetRelevantRequests(id);

    const {filters, setFilter} = useRequestFilter();

    if(isLoading) return <Spinner className={"w-full mx-auto size-7 my-10"} />

    if(isError) return <p>Error</p>

    return (
        <>
        <Table  className="w-full relative">
            <TableHeader>
                <TableRow>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Даты</TableHead>
                    <TableHead className="text-right">Стоимость</TableHead>
                    <TableHead className="text-right">Кол-во гостей</TableHead>
                    <TableHead>
                        <div
                            className="flex items-center gap-[8px] cursor-pointer select-none"
                        >
                            Статус
                        </div>
                    </TableHead>
                    <TableHead>
                        Актуален до
                    </TableHead>
                    <TableHead>Действия</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {requests?.content?.map((item:SearchRequest) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.authorName}</TableCell>
                        <TableCell>
                            {formatDate(item.checkInDate)} - {formatDate(item.checkOutDate)}
                        </TableCell>
                        <TableCell className="text-right">
                            {item.price.toLocaleString("ru-RU")} тг
                        </TableCell>
                        <TableCell className="text-right">
                            {item.countOfPeople} человек
                        </TableCell>
                        <TableCell>
                            <RequestStatusBadge status={item.status} />
                        </TableCell>
                        <TableCell className="text-left font-medium">
                            {hoursLeft(item.expiresAt)}
                        </TableCell>
                        <TableCell>
                            {handleSearchRequestStatus(item.price, item.status, item.id, id)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        {requests?.totalElements > 20 && (
                <div className="mt-4 sm:mt-6">
                  <TablePagination
                      page={filters.page ?? 0}
                      totalPages={requests.totalPages}
                      size={filters.size ?? 0}
                      onPageChange={(newPage) => setFilter("page", newPage)}
                  />
                </div>
              )}
        </>
    )
}
