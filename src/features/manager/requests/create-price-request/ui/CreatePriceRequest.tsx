import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {
    CreatePriceRequestFormFields
} from "@/features/manager/requests/create-price-request/ui/CreatePriceRequestFormFields";
import {Button} from "@/shared/ui/button";

interface CreatePriceRequestProps {
    price?: number;
    requestId: number;
    accId: number;
}

export function CreatePriceRequest({price, requestId, accId}:CreatePriceRequestProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"}>Откликнуться</Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md overflow-y-auto ">
                <DialogTitle>Создание заявки цены</DialogTitle>
                <CreatePriceRequestFormFields reqId={requestId} accId={accId} price={price} />
            </DialogContent>
        </Dialog>
    )
}