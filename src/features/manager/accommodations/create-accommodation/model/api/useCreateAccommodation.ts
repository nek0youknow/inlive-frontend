import {useMutation} from "@tanstack/react-query";
import {CreateAccommodationRequest} from "@/features/manager/accommodations/create-accommodation/model/types";
import {createAccommodation} from "@/features/manager/accommodations/create-accommodation/model/api/api";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {toast} from "sonner";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useCreateAccommodation(onSuccessCallback?: () => void) {

    return useMutation({
        mutationFn: (data: CreateAccommodationRequest) => createAccommodation(data),
        onSuccess: async () => {
            toast.success("Запрос на создание успешно отправлено.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
            onSuccessCallback?.();
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