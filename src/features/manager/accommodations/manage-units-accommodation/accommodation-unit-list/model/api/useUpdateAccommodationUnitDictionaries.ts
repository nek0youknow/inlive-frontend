import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateAccommodationUnitDictionaries} from "./api";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {toast} from "sonner";
import { UpdateAccommodationUnitDictionariesRequest } from "../types";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useUpdateAccommodationUnitDictionaries() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateAccommodationUnitDictionariesRequest) => updateAccommodationUnitDictionaries(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["accommodation-unit"]});
            await queryClient.invalidateQueries({queryKey: ["accommodation-units"]});
            toast.success("Словари номера успешно обновлены", {
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

