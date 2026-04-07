import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateAccommodationUnit} from "./api";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {toast} from "sonner";
import { UpdateAccommodationUnitRequest } from "../types";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useUpdateAccommodationUnit() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateAccommodationUnitRequest) => updateAccommodationUnit(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["accommodation-unit"]});
            await queryClient.invalidateQueries({queryKey: ["accommodation-units"]});
            toast.success("Информация о номере успешно обновлена", {
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

