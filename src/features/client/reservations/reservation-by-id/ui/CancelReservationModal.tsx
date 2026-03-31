"use client"
import {Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {TriangleAlert} from "lucide-react";
import {Button} from "@/shared/ui/button";
import {useCancelReservation} from "@/features/client/reservations/reservation-by-id/model/api/useCancelReservation";

interface CancelReservationModalProps {
    id: number;
}

export function CancelReservationModal({id}: CancelReservationModalProps) {
    const {mutate, isPending} = useCancelReservation();

    const onSubmit = () => {
        try {
            mutate(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">
                    Отменить бронирование
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>Отмена бронирования</DialogTitle>
                <div className="flex flex-col gap-6 mt-4">
                    <div className="flex flex-row gap-3 items-center text-gray-700">
                        <TriangleAlert className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        <p className="text-base">
                            Вы уверены, что хотите отменить бронирование?
                        </p>
                    </div>
                    <div className="flex self-end flex-row gap-3">
                        <Button 
                            onClick={onSubmit} 
                            variant="destructive"
                            disabled={isPending}
                        >
                            {isPending ? "Отмена..." : "Отменить бронь"}
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline" disabled={isPending}>
                                Нет
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

