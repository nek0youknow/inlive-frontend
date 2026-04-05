import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {removeService} from "@/features/admin/manage-services/remove-service/model/api/api";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useRemoveService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => removeService(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dictionary", "ACC_SERVICE"],
                exact: false
            });
            toast.success("Услуга была удалена.", {
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