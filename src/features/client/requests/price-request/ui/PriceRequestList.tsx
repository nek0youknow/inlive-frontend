"use client"
import {LabelTextInfo} from "@/shared/ui/label-text-info";
import {MessageSquareReply} from "lucide-react";
import {PriceResponseItem} from "./PriceResponseItem";
import {usePriceRequestForClient} from "@/features/client/requests/price-request/model/api/usePriceRequestForClient";
import {PriceRequest} from "@/entities/price-request/model/types";

interface PriceRequestListProps {

    requestId: number
}


export function PriceRequestList({requestId}: PriceRequestListProps) {

    const {data, respond, isResponding} = usePriceRequestForClient(requestId);

    const handleAccept = (id: number) => {
        respond({priceRequestId: id, status: "ACCEPTED"});
    };

    const handleReject = (id: number) => {
        respond({priceRequestId: id, status: "REJECTED"});
    };

    return (
        <div className={"bg-white p-6 border rounded-lg flex flex-col gap-4"}>
            <LabelTextInfo
                icon={<MessageSquareReply width={20} height={20} className={"text-green-500"} />}
                label={"Входящие ответы"}
            />
            <div className={"space-y-3"}>
                {data?.content?.length === 0 ? (
                    <div className={"text-center py-8 text-gray-500"}>
                        <p>Нет входящих ответов</p>
                    </div>
                ) : (
                    data?.content?.map((response:PriceRequest) => (
                        <PriceResponseItem
                            key={response.id}
                            response={response}
                            onAccept={handleAccept}
                            onReject={handleReject}
                            isResponding={isResponding}
                            hasResponded={response?.clientResponseStatus !== "WAITING"}
                            responseStatus={response?.clientResponseStatus as "ACCEPTED" | "REJECTED" | null}
                        />
                    ))
                )}
            </div>
        </div>
    )
}