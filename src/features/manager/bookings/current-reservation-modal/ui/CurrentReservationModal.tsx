import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { CalendarIcon, UsersIcon, DollarSignIcon, UserIcon } from "lucide-react";
import {ReservationStatusUi} from "@/features/manager/bookings/current-reservation-modal/ui/ReservationStatusUi";
import {
    ChangeReservationStatus
} from "@/features/manager/bookings/current-reservation-modal/ui/ChangeReservationStatus";
import {useState} from "react";
import {useGetReservation} from "@/features/manager/bookings/current-reservation-modal/model/api/useGetReservation";
import { formatDate } from "@/shared/lib/date/formateDate";


interface CurrentReservationModalProps {
    reservationId: number;
}

export function CurrentReservationModal({ reservationId }: CurrentReservationModalProps) {
    const [open, setOpen] = useState(false);

    const {data} = useGetReservation(reservationId, open);


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">Подробнее</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md md:w-full w-[90%] max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between gap-4">
                    <DialogTitle className="text-lg font-semibold">
                        Бронирование №{data?.id}
                    </DialogTitle>
                </div>


                <ReservationStatusUi status={data?.status} />


                <Separator className="my-2" />


                <div className="space-y-4">
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Размещение
                        </p>
                        <p className="text-sm font-medium mt-1">{data?.accommodationName}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Юнит
                        </p>
                        <p className="text-sm font-medium mt-1">{data?.accommodationUnitName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                                <CalendarIcon className="w-3.5 h-3.5" />
                                Заезд
                            </p>
                            <p className="text-sm font-medium mt-1">{formatDate(data?.checkInDate.split('T')[0])}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                                <CalendarIcon className="w-3.5 h-3.5" />
                                Выезд
                            </p>
                            <p className="text-sm font-medium mt-1">{formatDate(data?.checkOutDate.split('T')[0])}</p>
                        </div>
                    </div>

                    <div className="flex w-full gap-4 pt-2">
                        <div className="bg-muted/50 border w-full rounded-lg p-3">
                            <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                                <UsersIcon className="w-3.5 h-3.5" />
                                Гостей
                            </p>
                            <p className="text-lg font-bold mt-1">{data?.guestCount}</p>
                        </div>
                    </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Информация о клиенте
                    </p>

                    <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                            <UserIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <div>
                                <p className="text-xs text-muted-foreground">Имя</p>
                                <p className="text-sm font-medium">{data?.clientName}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <Separator className="my-4" />

                <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <DollarSignIcon className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-muted-foreground">
                                Итоговая сумма
                            </span>
                        </div>
                        <p className="text-lg font-bold text-primary">
                            {data?.price.toLocaleString("ru-RU")} Тг
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 pt-4">
                    <ChangeReservationStatus reservationId={reservationId} />
                </div>
            </DialogContent>
        </Dialog>
    );
}