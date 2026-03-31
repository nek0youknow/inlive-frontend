
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SearchRequestCredientials} from "@/features/client/send-request/client-search-input/model/types";
import {postSearchRequest} from "@/features/client/send-request/client-search-input/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {formatErrorForToast} from "@/shared/lib/error/formatError";
import { useRouter } from "next/navigation";

export function usePostSearchRequests(onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    const router = useRouter();

    return useMutation({
        mutationFn: async (data: SearchRequestCredientials) =>
            postSearchRequest(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["search-requests"],
                exact: false
            });
            toast.success("Запрос был сделан.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime(),
            });
            onSuccessCallback?.();
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
        },
        onSettled: () => {
            console.log("onSettled");
        },
    })
}