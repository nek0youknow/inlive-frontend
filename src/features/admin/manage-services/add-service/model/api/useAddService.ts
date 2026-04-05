
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createService} from "@/features/admin/manage-services/add-service/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useAddService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (value: string) =>
            createService({
                key: "ACC_SERVICE",
                value: value
            })
        ,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dictionary", "ACC_SERVICE"],
                exact: false
            });
            toast.success("Сервис был создан.", {
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
        },
        onSettled: () => {
            console.log("onSettled");
        }
    })
}
