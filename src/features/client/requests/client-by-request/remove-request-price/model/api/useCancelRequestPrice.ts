import {useMutation, useQueryClient} from "@tanstack/react-query";
import {cancelRequestApi} from "@/features/client/requests/client-by-request/remove-request-price/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {useRouter} from "next/navigation";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useCancelRequest() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (id: number) => cancelRequestApi(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["search-requests"], exact: false});
            toast.info("Запрос был отменен.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
            router.push("/client/requests");
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