import {Label} from "@/shared/ui/label";
import {PriceRequestClientStatus} from "@/entities/price-request/model/types";
import {CheckCircle2, Loader, XCircle, Clock} from "lucide-react";

interface PriceRequestStatusProps {
    status?: string;
}

export function RequestStatus({status}: PriceRequestStatusProps) {

    switch (status) {
        case PriceRequestClientStatus.WAITING:
            return (
                <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 animate-spin" />
                    <div>
                        <p className="text-sm font-semibold text-yellow-900">В ожидании</p>
                        <p className="text-xs text-yellow-700">Клиент рассматривает ваше предложение</p>
                    </div>
                </div>
            );
        case PriceRequestClientStatus.REJECTED:
            return (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-red-900">Отклонено</p>
                        <p className="text-xs text-red-700">Клиент отклонил ваше предложение</p>
                    </div>
                </div>
            );
        case PriceRequestClientStatus.ACCEPTED:
            return (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-green-900">Принято</p>
                        <p className="text-xs text-green-700">Ваше предложение одобрено клиентом</p>
                    </div>
                </div>
            );
        default:
            return (
                <div className="flex flex-col gap-2">
                    <Label>Ответ от клиента</Label>
                    <div className="bg-yellow-50 border border-yellow-200 w-full gap-3 rounded-xl flex flex-col p-5 items-center justify-center">
                        <Loader width={40} height={40} className="text-yellow-600 animate-spin" />
                        <div className="flex flex-col items-center gap-1">
                            <p className="font-bold text-lg text-yellow-900">В ожидании</p>
                            <p className="text-xs text-yellow-700">Ожидаем ответ от клиента...</p>
                        </div>
                    </div>
                </div>
            );
    }
}