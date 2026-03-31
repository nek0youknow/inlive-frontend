import {useMutation, useQueryClient} from "@tanstack/react-query";
import {cancelReservationApi} from "@/features/client/reservations/reservation-by-id/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {useRouter} from "next/navigation";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useCancelReservation() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (id: number) => cancelReservationApi(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["my-reservations"], exact: false});
            await queryClient.invalidateQueries({queryKey: ["reservation-by-id"], exact: false});
            toast.info("Бронирование было отменено.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
            router.push("/client/reservations");
        },
        onError: (error) => {
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

