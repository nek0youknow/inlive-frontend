"use client"
import {useReservationById} from "@/features/client/reservations/reservation-by-id/model/useReservationById";
import {Spinner} from "@/shared/ui/spinner";
import {Container} from "@/shared/ui/container";
import {Badge} from "@/shared/ui/badge";
import {formatDate} from "@/shared/lib/date/formateDate";
import {LabelTextInfo} from "@/shared/ui/label-text-info";
import {Calendar, Building2, DollarSign, Users, Clock, CheckCircle2, XCircle, Info, MapIcon} from "lucide-react";
import {ReservationStatus} from "@/entities/reservation/model/types";
import {CancelReservationModal} from "@/features/client/reservations/reservation-by-id/ui/CancelReservationModal";

interface ReservationByIdProps {
    id: number;
}

const getStatusInfo = (status: ReservationStatus) => {
    switch (status) {
        case ReservationStatus.WAITING_TO_APPROVE:
            return {
                text: "Ожидание подтверждения",
                badge: (
                    <Badge variant="outline" className="border-yellow-300 text-yellow-700 bg-yellow-50 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2">
                        Ожидание подтверждения
                    </Badge>
                ),
                bgColor: "bg-yellow-50",
                borderColor: "border-yellow-200",
                iconColor: "text-yellow-600"
            };
        case ReservationStatus.APPROVED:
            return {
                text: "Подтверждено",
                badge: (
                    <Badge className="bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-100 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2">
                        ✓ Подтверждено
                    </Badge>
                ),
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                iconColor: "text-blue-600"
            };
        case ReservationStatus.FINISHED_SUCCESSFUL:
            return {
                text: "Завершено успешно",
                badge: (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2">
                        ✓ Завершено успешно
                    </Badge>
                ),
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
                iconColor: "text-green-600"
            };
        case ReservationStatus.REJECTED:
            return {
                text: "Отклонено",
                badge: (
                    <Badge variant="destructive" className="hover:bg-red-600 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2">
                        ✗ Отклонено
                    </Badge>
                ),
                bgColor: "bg-red-50",
                borderColor: "border-red-200",
                iconColor: "text-red-600"
            };
        case ReservationStatus.CLIENT_DIDNT_CAME:
            return {
                text: "Клиент не приехал",
                badge: (
                    <Badge variant="outline" className="border-orange-300 text-orange-700 bg-orange-50 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2">
                        ✗ Клиент не приехал
                    </Badge>
                ),
                bgColor: "bg-orange-50",
                borderColor: "border-orange-200",
                iconColor: "text-orange-600"
            };
        case ReservationStatus.CANCELED:
            return {
                text: "Отменено",
                badge: (
                    <Badge variant="destructive" className="hover:bg-red-600 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2">
                        ✗ Отменено
                    </Badge>
                ),
                bgColor: "bg-red-50",
                borderColor: "border-red-200",
                iconColor: "text-red-600"
            };
        default:
            return {
                text: "Неизвестно",
                badge: (
                    <Badge variant="outline" className="border-gray-300 text-gray-700 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2">
                        {status}
                    </Badge>
                ),
                bgColor: "bg-gray-50",
                borderColor: "border-gray-200",
                iconColor: "text-gray-600"
            };
    }
};

export function ReservationById({id}: ReservationByIdProps) {
    const {data, isError, isLoading} = useReservationById(id);

    if (isError) return (
        <Container className="my-6 sm:my-8 md:my-10">
            <div className="text-center py-8 sm:py-10 md:py-12 bg-white rounded-xl border border-red-200 px-4">
                <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-400 mx-auto mb-3" />
                <p className="text-sm sm:text-base text-red-600">Ошибка при загрузке бронирования</p>
            </div>
        </Container>
    );

    if (isLoading) return (
        <Container className="my-6 sm:my-8 md:my-10">
            <Spinner className="w-full mx-auto size-7 my-10" />
        </Container>
    );

    if (!data) return null;

    const statusInfo = getStatusInfo(data.status);

    return (
        <Container className="my-6 sm:my-8 md:my-10">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                <div className="space-y-1 sm:space-y-2 px-2 sm:px-0">
                    <h1 className="text-2xl sm:text-3xl font-bold">Бронирование #{data.id}</h1>
                    <span className="opacity-60 text-sm sm:text-base">Размещение: {data.accommodationName}</span>
                </div>

                <div className={`bg-white border-2 ${statusInfo.borderColor} ${statusInfo.bgColor} rounded-xl p-4 sm:p-5 md:p-6`}>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`p-2 sm:p-3 ${statusInfo.bgColor} rounded-lg border ${statusInfo.borderColor}`}>
                            <Info width={24} height={24} className={`sm:w-7 sm:h-7 ${statusInfo.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Статус бронирования</h2>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                                Текущий статус вашего бронирования
                            </p>
                            <div className="flex flex-wrap">
                                {statusInfo.badge}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
                        <div className="p-2 sm:p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex-shrink-0">
                            <Building2 width={20} height={20} className="sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                                {data.accommodationName}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">
                                {data.accommodationUnitName}
                            </p>
                        </div>
                    </div>

                    <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                        <LabelTextInfo
                            icon={<Calendar width={18} height={18} className="sm:w-5 sm:h-5 text-primary" />}
                            label="Заезд"
                            value={formatDate(data.checkInDate.split('T')[0])}
                        />
                        <LabelTextInfo
                            icon={<Calendar width={18} height={18} className="sm:w-5 sm:h-5 text-primary" />}
                            label="Выезд"
                            value={formatDate(data.checkOutDate.split('T')[0])}
                        />
                        <LabelTextInfo
                            icon={<Users width={18} height={18} className="sm:w-5 sm:h-5 text-primary" />}
                            label="Количество гостей"
                            value={data.guestCount}
                        />
                        <LabelTextInfo
                            icon={<DollarSign width={18} height={18} className="sm:w-5 sm:h-5 text-green-500" />}
                            label="Цена"
                            value={`${data.price.toLocaleString()} тг`}
                        />
                        <LabelTextInfo

                            icon={<MapIcon width={18} height={18} className="sm:w-5 sm:h-5 text-green-500" />}
                            label="Адрес"
                            value={`${data.city}, ${data.district}, ${data.address}`}
                        />
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Дополнительная информация</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                        <LabelTextInfo
                            icon={<Clock width={18} height={18} className="sm:w-5 sm:h-5 text-gray-500" />}
                            label="Создано"
                            value={formatDate(data.createdAt.split('T')[0])}
                        />
                        <LabelTextInfo
                            icon={<Clock width={18} height={18} className="sm:w-5 sm:h-5 text-gray-500" />}
                            label="Обновлено"
                            value={formatDate(data.updatedAt.split('T')[0])}
                        />
                        <LabelTextInfo
                            icon={<CheckCircle2 width={18} height={18} className={`sm:w-5 sm:h-5 ${data.needToPay ? "text-orange-500" : "text-green-500"}`} />}
                            label="Требуется оплата"
                            value={data.needToPay ? "Да" : "Нет"}
                        />
                        <LabelTextInfo
                            icon={<Building2 width={18} height={18} className="sm:w-5 sm:h-5 text-gray-500" />}
                            label="ID клиента"
                            value={data.clientId}
                        />
                    </div>
                </div>

                {(data.status === ReservationStatus.WAITING_TO_APPROVE || data.status === ReservationStatus.APPROVED) && (
                    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Действия</h3>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Вы можете отменить бронирование, если передумали
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <CancelReservationModal id={data.id} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}