import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateAccommodationMainInfo, UpdateAccommodationMainInfoRequest} from "./updateApi";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {toast} from "sonner";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useUpdateAccommodationMainInfo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateAccommodationMainInfoRequest) => updateAccommodationMainInfo(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["accommodation"]});
            toast.success("Основная информация успешно обновлена", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
        },
        onError: async (error) => {
            const formattedError = formatErrorForToast(error);
            toast.error(formattedError.message, {
                position: "top-right",
                richColors: true,
                description: formattedError.description || "Проверьте данные и попробуйте снова",
            });
        }
    });
}

