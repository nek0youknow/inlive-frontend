import {Badge} from "@/shared/ui/badge";

interface BookingStatusVariantProps {
    status: string;
}

export function BookingStatusVariant({status}:BookingStatusVariantProps) {

    switch(status) {
        case "FINISHED_SUCCESSFUL": return <Badge>Успешно</Badge>;
        case "WAITING_TO_APPROVE": return <Badge variant={"waiting"}>Ждет подтверждения</Badge>
        case "APPROVED": return <Badge>Подтверждено</Badge>
        case "REJECTED": return <Badge variant={"destructive"}>Отказ</Badge>
        case "CLIENT_DIDNT_CAME": return <Badge variant={"outline"}>Клиент не пришел</Badge>
        case "CANCELED": return <Badge variant={"destructive"}>Отменено</Badge>
    }
}