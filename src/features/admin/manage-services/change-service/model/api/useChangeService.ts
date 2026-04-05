import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {changeService} from "@/features/admin/manage-services/change-service/model/api/api";
import {ChangeServiceCredentials} from "@/features/admin/manage-services/change-service/model/types";
import {formatErrorForToast} from "@/shared/lib/error/formatError";



export function useChangeService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ChangeServiceCredentials) => changeService(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dictionary", "ACC_SERVICE"],
                exact: false
            });
            toast.success("Услуга была изменена.", {
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