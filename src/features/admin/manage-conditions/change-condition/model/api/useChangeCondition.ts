import {useMutation, useQueryClient} from "@tanstack/react-query";
import {changeCondition} from "@/features/admin/manage-conditions/change-condition/model/api/api";
import {ChangeConditionCredentials} from "@/features/admin/manage-conditions/change-condition/model/types";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {formatErrorForToast} from "@/shared/lib/error/formatError";



export function useChangeCondition() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ChangeConditionCredentials) => changeCondition(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dictionary", "ACC_CONDITION"],
                exact: false
            });
            toast.success("Условие было изменено.", {
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