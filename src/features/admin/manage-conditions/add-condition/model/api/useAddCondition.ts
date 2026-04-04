import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCondition} from "@/features/admin/manage-conditions/add-condition/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useAddCondition() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (value: string) =>
            createCondition({
                key: "ACC_CONDITION",
                value: value
            })
        ,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dictionary", "ACC_CONDITION"],
                exact: false
            });
            toast.success("Условие было создано.", {
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
        },
    })
}