import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removeCondition} from "@/features/admin/manage-conditions/remove-condition/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useRemoveCondition() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => removeCondition(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dictionary", "ACC_CONDITION"],
                exact: false
            });
            toast.success("Условие было удалено.", {
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