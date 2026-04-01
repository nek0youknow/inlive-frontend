import {Check, X, Building2} from "lucide-react";
import {Button} from "@/shared/ui/button";
import {Badge} from "@/shared/ui/badge";
import {PriceRequest} from "@/entities/price-request/model/types";

interface PriceResponseItemProps {
    response: PriceRequest;
    onAccept: (id: number) => void;
    onReject: (id: number) => void;
    isResponding?: boolean;
    hasResponded?: boolean;
    responseStatus?: "ACCEPTED" | "REJECTED" | null;
}

export function PriceResponseItem({
                                      response,
                                      onAccept,
                                      onReject,
                                      isResponding = false,
                                      hasResponded = false,
                                      responseStatus = null
                                  }: PriceResponseItemProps) {

    // Если уже ответили, показываем финальный статус
    if (hasResponded) {
        const finalStatus = responseStatus || response.clientResponseStatus;

        return (
            <article
                className={`group border-2 rounded-xl p-4 transition-all duration-300 ${
                    finalStatus === "ACCEPTED"
                        ? "border-green-200 bg-green-50/30"
                        : "border-red-200 bg-red-50/30"
                }`}
            >
                <div className={"flex items-start gap-3"}>
                    <div className={"flex-shrink-0 p-2.5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg group-hover:from-primary/20 group-hover:to-primary/10 transition-colors"}>
                        <Building2 width={18} height={18} className={"text-primary"} />
                    </div>

                    <div className={"flex-1 min-w-0"}>
                        <div className={"flex items-baseline gap-2 mb-1"}>
                            <h4 className={"font-semibold text-gray-900 truncate"}>
                                {response.accommodationName}
                            </h4>
                            <span className={"text-sm text-gray-600 whitespace-nowrap"}>
                                {response.accommodationUnitName}
                            </span>
                        </div>

                        <div className={"flex items-center gap-3 mt-3"}>
                            <div className={"flex items-baseline gap-1"}>
                                <span className={"text-xl font-bold text-primary"}>
                                    {response.price.toLocaleString()}
                                </span>
                                <span className={"text-sm text-gray-600"}>тг</span>
                            </div>

                            <div className={"h-4 w-px bg-gray-200"}></div>

                            <Badge className={
                                finalStatus === "ACCEPTED"
                                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                                    : "bg-red-100 text-red-700 hover:bg-red-100"
                            }>
                                {finalStatus === "ACCEPTED" ? "✓ Принято" : "✗ Отклонено"}
                            </Badge>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "ACCEPTED":
                return <Badge className={"bg-green-100 text-green-700 hover:bg-green-100"}>Принято</Badge>;
            case "REJECTED":
                return <Badge variant={"destructive"} className={"hover:bg-red-600"}>Отклонено</Badge>;
            case "WAITING":
                return <Badge variant={"waiting"}>Ожидание</Badge>;
            default:
                return null;
        }
    };

    return (
        <article className={`group border-2 rounded-xl p-4 transition-all duration-300 border-gray-200 hover:border-primary/30 bg-white hover:shadow-md`}>
            <div className={"flex items-start gap-3"}>
                <div className={"flex-shrink-0 p-2.5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg group-hover:from-primary/20 group-hover:to-primary/10 transition-colors"}>
                    <Building2 width={18} height={18} className={"text-primary"} />
                </div>

                <div className={"flex-1 min-w-0"}>
                    <div className={"flex items-baseline gap-2 mb-1"}>
                        <h4 className={"font-semibold text-gray-900 truncate"}>
                            {response.accommodationName}
                        </h4>
                        <span className={"text-sm text-gray-600 whitespace-nowrap"}>
                            {response.accommodationUnitName}
                        </span>
                    </div>

                    <div className={"flex items-center gap-3 mt-3"}>
                        <div className={"flex items-baseline gap-1"}>
                            <span className={"text-xl font-bold text-primary"}>
                                {response.price.toLocaleString()}
                            </span>
                            <span className={"text-sm text-gray-600"}>тг</span>
                        </div>

                        <div className={"h-4 w-px bg-gray-200"}></div>

                        {getStatusBadge(response.clientResponseStatus)}
                    </div>
                </div>

                <div className={"flex gap-2 flex-shrink-0"}>
                    <Button
                        size={"sm"}
                        variant={"default"}
                        onClick={() => onAccept(response.id)}
                        disabled={isResponding}
                        className={"flex items-center gap-1.5 h-9"}
                    >
                        <Check width={16} height={16} />
                        <span>{isResponding ? "..." : "Принять"}</span>
                    </Button>
                    <Button
                        size={"sm"}
                        variant={"outline"}
                        onClick={() => onReject(response.id)}
                        disabled={isResponding}
                        className={"flex items-center gap-1.5 h-9 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"}
                    >
                        <X width={16} height={16} />
                        <span>{isResponding ? "..." : "Отклонить"}</span>
                    </Button>
                </div>
            </div>
        </article>
    );
}