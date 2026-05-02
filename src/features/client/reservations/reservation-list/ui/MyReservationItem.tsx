"use client"
import {formatDate} from "@/shared/lib/date/formateDate";
import {Badge} from "@/shared/ui/badge";
import {Calendar, Building2, DollarSign} from "lucide-react";
import Link from "next/link";
import {Reservation, ReservationStatus} from "@/entities/reservation/model/types";
import {useRouter} from "next/navigation";
import {useState} from "react";

interface ReservationItemProps {
    reservation: Reservation;
}

const getStatusBadge = (status: ReservationStatus) => {
    switch (status) {
        case ReservationStatus.WAITING_TO_APPROVE:
            return (
                <Badge variant="outline" className="border-yellow-600/50 text-yellow-300 bg-yellow-950/35">
                    Ожидание подтверждения
                </Badge>
            );
        case ReservationStatus.APPROVED:
            return (
                <Badge className="bg-rose-900/50 border-rose-700/50 text-rose-300 hover:bg-rose-900/50">
                    ✓ Подтверждено
                </Badge>
            );
        case ReservationStatus.FINISHED_SUCCESSFUL:
            return (
                <Badge className="bg-rose-900/50 text-rose-300 hover:bg-rose-900/50">
                    ✓ Завершено успешно
                </Badge>
            );
        case ReservationStatus.REJECTED:
            return (
                <Badge variant="destructive" className="hover:bg-red-600">
                    ✗ Отклонено
                </Badge>
            );
        case ReservationStatus.CLIENT_DIDNT_CAME:
            return (
                <Badge variant="outline" className="border-orange-600/50 text-orange-300 bg-orange-950/35">
                    ✗ Клиент не приехал
                </Badge>
            );
        case ReservationStatus.CANCELED:
            return (
                <Badge variant="destructive" className="">
                    ✗ Отменено
                </Badge>
            );
        default:
            return (
                <Badge variant="outline" className="border-border text-muted-foreground">
                    {status}
                </Badge>
            );
    }
};

export function ReservationItem({reservation}: ReservationItemProps) {
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsNavigating(true);
        router.push(`/client/reservations/${reservation.id}`);
    };

    return (
        <Link 
            href={`/client/reservations/${reservation.id}`} 
            key={reservation.id}
            prefetch={false}
            onClick={handleClick}
        >
            <article className={`group bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all duration-300 cursor-pointer ${isNavigating ? 'opacity-50 cursor-wait' : ''}`}>
                <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                    <div className="flex-shrink-0 p-3 bg-gradient-to-br w-fit from-primary/10 to-primary/5 rounded-lg group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                        <Building2 width={24} height={24} className="text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-4">
                            <h3 className="text-lg font-bold text-foreground truncate">
                                {reservation.accommodationName}
                            </h3>
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {reservation.accommodationUnitName}
                        </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="flex flex-col gap-1">
                                <dt className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wide">
                                    <Calendar width={14} height={14} className="flex-shrink-0 text-primary/70" />
                                    <span>Заезд</span>
                                </dt>
                                <dd className="text-sm font-semibold text-foreground">
                                    {formatDate(reservation.checkInDate.split('T')[0])}
                                </dd>
                            </div>


                            <div className="flex flex-col gap-1">
                                <dt className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wide">
                                    <Calendar width={14} height={14} className="flex-shrink-0 text-primary/70" />
                                    <span>Выезд</span>
                                </dt>
                                <dd className="text-sm font-semibold text-foreground">
                                    {formatDate(reservation.checkOutDate.split('T')[0])}
                                </dd>
                            </div>

                            <div className="flex flex-col gap-1">
                                <dt className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wide">
                                    <DollarSign width={14} height={14} className="flex-shrink-0 text-primary/70" />
                                    <span>Цена</span>
                                </dt>
                                <dd className="text-sm font-bold text-primary">
                                    {reservation.price.toLocaleString()} тг
                                </dd>
                            </div>


                            <div className="flex flex-col gap-1">
                                <dt className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">
                                    Статус
                                </dt>
                                {getStatusBadge(reservation.status)}
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            ID: #{reservation.id}
                        </div>
                    </div>
                </div>
                {isNavigating && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/80 rounded-xl z-10">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </article>
        </Link>
    );
}