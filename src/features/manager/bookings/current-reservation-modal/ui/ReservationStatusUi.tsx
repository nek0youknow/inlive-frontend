import {Ban, CheckCircle2, Clock, InfoIcon, UserRoundXIcon} from "lucide-react";
import {ReservationStatus} from "@/entities/reservation/model/types";

interface ReservationStatusUiProps {
    status?: string;
}

export function ReservationStatusUi({status}: ReservationStatusUiProps) {

    switch (status) {
        case ReservationStatus.WAITING_TO_APPROVE:
            return (
                <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 animate-spin" />
                    <div>
                        <p className="text-sm font-semibold text-yellow-900">В ожидании</p>
                        <p className="text-xs text-yellow-700">Менеджер рассматривает предложение</p>
                    </div>
                </div>
            )
        case ReservationStatus.APPROVED:
            return (
                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <InfoIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-blue-900">Подтверждено</p>
                        <p className="text-xs text-blue-700">Менеджер подтвердил бронирование и ожидает приезд клиента</p>
                    </div>
                </div>
            );
        case ReservationStatus.FINISHED_SUCCESSFUL:
            return (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-green-900">Успешно</p>
                        <p className="text-xs text-green-700">Клиент пришел и бронирование было завершено</p>
                    </div>
                </div>
            )
        case ReservationStatus.REJECTED:
            return (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <Ban className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-red-900">Отклонен</p>
                        <p className="text-xs text-red-700">Менеджер отклонил бронирование</p>
                    </div>
                </div>
            )
        case ReservationStatus.CLIENT_DIDNT_CAME:
            return (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <UserRoundXIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-red-900">Клиент не пришел</p>
                        <p className="text-xs text-red-700">Бронирование было подтверждено, но клиент не пришел</p>
                    </div>
                </div>
            )
    }

}