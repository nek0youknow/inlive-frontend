"use client"
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {RequestStatus} from "@/features/manager/requests/price-request/ui/RequestStatus";
import {Eye, CheckCircle2} from "lucide-react";
import {RequestAccInfo} from "@/features/manager/requests/price-request/ui/RequestAccInfo";
import {useGetPriceRequestById} from "@/features/manager/requests/price-request/model/api/useGetPriceRequestById";
import {useState} from "react";
import {Spinner} from "@/shared/ui/spinner";
import {UpdatePriceModal} from "@/features/manager/requests/price-request/ui/UpdatePriceModal";

interface PriceRequestModalProps {
    requestId: number
}

export function PriceRequestModal({requestId}: PriceRequestModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const {data, isLoading} = useGetPriceRequestById(requestId, isOpen);



    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    size={"sm"}
                    variant="outline"
                    className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all"
                >
                    <Eye className="w-4 h-4" />
                    Подробнее
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] gap-0 p-0 border-0 rounded-2xl shadow-xl">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 pt-6 pb-4 border-b border-gray-200 rounded-t-2xl">
                    <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        Ценовое предложение
                    </DialogTitle>
                    <p className="text-sm text-gray-600 mt-1">Статус и детали вашего предложения</p>
                </div>

                <div className="px-6 py-6 flex flex-col gap-6">
                    {isLoading ? (
                        <Spinner className="w-full mx-auto size-7" />
                    ) : (
                        <>
                            <RequestStatus status={data?.content[0]?.clientResponseStatus} />

                            <RequestAccInfo
                                accommodationName={data?.content[0]?.accommodationName}
                                accommodationUnitName={data?.content[0]?.accommodationUnitName}
                                price={data?.content[0]?.price}
                            />
                        </>
                    )}

                    <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                        {
                            data?.content[0]?.clientResponseStatus === "REJECTED" && (
                                <UpdatePriceModal parentModal={setIsOpen} id={data?.content[0]?.id} curPrice={data?.content[0].price} />
                            )
                        }
                        <Button
                            variant="outline"
                            className="flex-1 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Закрыть
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}