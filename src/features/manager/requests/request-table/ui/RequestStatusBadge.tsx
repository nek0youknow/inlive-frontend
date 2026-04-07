import {SearchRequestStatus} from "@/entities/search-request/model/types";
import {Badge} from "@/shared/ui/badge";

export function handleRelevantRequests(status: string): string {
    switch (status) {
        case SearchRequestStatus.OPEN_TO_PRICE_REQUEST:
            return "Открыт к запросам";
        case SearchRequestStatus.PRICE_REQUEST_PENDING:
            return "Ожидание цены";
        case SearchRequestStatus.WAIT_TO_RESERVATION:
            return "Ожидание бронирования";
        case SearchRequestStatus.FINISHED:
            return "Завершена";
        default:
            return "Неизвестный статус";
    }
}

interface RequestStatusBadgeProps {
    status: string;
}

export function RequestStatusBadge({status}:RequestStatusBadgeProps) {

    if(status === SearchRequestStatus.FINISHED) return (
        <Badge>{handleRelevantRequests(status)}</Badge>
    )

    return (
        <Badge variant={"waiting"}>{handleRelevantRequests(status)}</Badge>
    )
}