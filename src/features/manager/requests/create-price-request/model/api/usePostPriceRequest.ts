import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createPriceRequest} from "@/features/manager/requests/create-price-request/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {PriceRequestCredetials} from "@/features/manager/requests/create-price-request/model/types";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function usePostPriceRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data:PriceRequestCredetials) => createPriceRequest(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['relevant-requests']});
            toast.success("Заявка цены была создана.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            })
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