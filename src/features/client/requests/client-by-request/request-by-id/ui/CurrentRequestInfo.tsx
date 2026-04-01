"use client"
import {Container} from "@/shared/ui/container";
import {
    RequestStatusCheck,
} from "@/features/client/requests/client-by-request/request-by-id/ui/RequestStatusCheck";
import {useGetSearchRequest} from "@/features/client/requests/client-by-request/request-by-id/model/api/useGetSearchRequest";
import {Spinner} from "@/shared/ui/spinner";
import {LabelTextInfo} from "@/shared/ui/label-text-info";
import {CalendarIcon, Clock, EditIcon, StarIcon, UsersIcon} from "lucide-react";
import {TagList} from "@/shared/ui/TagList";
import {Dictionary} from "@/entities/dictionary/model/types";
import {
    ClientSearchRequestPriceModal
} from "@/features/client/requests/client-by-request/update-request-price/ui/ClientSearchRequestPriceModal";
import {
    RemoveSearchRequestModal
} from "@/features/client/requests/client-by-request/remove-request-price/ui/RemoveSearchRequestModal";
import {PriceRequestList} from "@/features/client/requests/price-request/ui/PriceRequestList";
import {formatDate, hoursLeft} from "@/shared/lib/date/formateDate";

interface CurrentRequestInfoProps {
    requestId: number;
}

export function CurrentRequestInfo({requestId}:CurrentRequestInfoProps) {

    const {data, isError, isLoading} = useGetSearchRequest(requestId);

    if(isError) return <p>Error</p>;
    if(isLoading) return <Spinner className={"w-full mx-auto size-7 my-10"} />

    return (
        <Container className={" w-full justify-center gap-5"}>
            <div className={"flex flex-row justify-between w-full mt-10 "}>
                <div className={"space-y-2 max-md:space-y-1"}>
                    <h2 className={"text-2xl sm:text-3xl font-bold  "}>Заявка #{data?.id}</h2>
                    <span className={"opacity-60 max-md:text-sm"}>От {data?.authorName}</span>
                </div>
                <div className={"text-right space-y-2 max-md:space-y-1"}>
                    <p className={"font-medium opacity-60 max-md:text-sm"}>Бюджет</p>
                    <p className={"text-2xl sm:text-3xl font-bold text-green-600"}>{data?.price.toLocaleString("ru-RU")} Тг</p>
                </div>
            </div>
            <div className={"flex flex-col lg:flex-row lg:justify-between gap-4 sm:gap-5 w-full"}>
                <div className={"flex flex-col w-full gap-4 sm:gap-5 my-6 sm:my-8 md:my-10"}>
                    {
                        data?.status === "PRICE_REQUEST_PENDING" && (
                            <PriceRequestList requestId={requestId} />
                        )
                    }

                    <RequestStatusCheck currentStatus={data?.status} />
                    <div className={"bg-white border rounded-lg flex flex-col gap-6 sm:gap-8 md:gap-10 py-4 sm:py-5 md:py-6 px-4 sm:px-5 md:px-6"}>
                        <div className={"flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-2"}>
                            <LabelTextInfo
                                icon={<CalendarIcon width={18} height={18} className={"sm:w-5 sm:h-5 text-green-500"} />}
                                label={"Заезд"}
                                value={formatDate(data?.checkInDate.split('T')[0])}
                            />
                            <LabelTextInfo
                                icon={<CalendarIcon width={18} height={18} className={"sm:w-5 sm:h-5 text-green-500"} />}
                                label={"Выезд"}
                                value={formatDate(data?.checkOutDate.split('T')[0])}
                            />
                            <LabelTextInfo
                                icon={<UsersIcon width={18} height={18} className={"sm:w-5 sm:h-5 text-green-500"} />}
                                label={"Гости"}
                                value={data?.countOfPeople}
                            />
                            <LabelTextInfo
                                icon={<StarIcon width={18} height={18} className={"sm:w-5 sm:h-5 text-yellow-500"} />}
                                label={"Рейтинг"}
                                value={`от ${data?.fromRating} до ${data?.toRating}`}
                            />
                            {data?.expiresAt && (
                                <LabelTextInfo
                                    icon={<Clock width={18} height={18} className="sm:w-5 sm:h-5 text-red-500" />}
                                    label="Актуален до"
                                    value={hoursLeft(data?.expiresAt)}
                                />
                            )}
                        </div>
                        <TagList
                            title="Типы размещения:"
                            items={data?.unitTypes}
                            color="green"
                        />

                        <TagList
                            title="Необходимые услуги:"
                            items={data?.services.map((service:Dictionary) => service.value)}
                            color="blue"
                        />

                        <TagList
                            title="Необходимые условия:"
                            items={data?.conditions.map((condition:Dictionary) => condition.value)}
                            color="purple"
                        />
                    </div>
                </div>
                {data?.status === "OPEN_TO_PRICE_REQUEST" && (
                    <div className={"bg-white border flex flex-col my-6 sm:my-8 md:my-10 gap-4 sm:gap-5 w-full lg:w-1/2 h-fit rounded-lg p-4 sm:p-5 md:p-6"}>
                        <LabelTextInfo icon={<EditIcon width={18} height={18} className={"sm:w-5 sm:h-5 text-green-500"} />} label={"Действия"} />
                        <div className={"flex flex-col w-full gap-3"}>
                            <ClientSearchRequestPriceModal id={requestId} />
                            <RemoveSearchRequestModal id={requestId} />
                        </div>
                    </div>
                )}
            </div>
        </Container>
    )
}