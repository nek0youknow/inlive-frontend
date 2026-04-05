import {useMutation, useQueryClient} from "@tanstack/react-query";
import {changeReservationFinalStatus} from "@/features/manager/bookings/current-reservation-modal/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

interface PutReservationFinalStatusParams {
    reservationId: number,
    status: string
}

export function usePutReservationFinalStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({reservationId, status}:PutReservationFinalStatusParams) => await changeReservationFinalStatus(reservationId, status),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["reservations"], exact:false});
            toast.success("Статус бронирования было обновлено.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            })
        },
        onError: async (error) => {
            const formattedError = formatErrorForToast(error);
            toast.error(formattedError.message, {
                position: "top-right",
                richColors: true,
                description: formattedError.description || "Проверьте данные и попробуйте снова",
            });
            return error.message;
        }
    })
}