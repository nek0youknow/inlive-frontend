import {useMutation} from "@tanstack/react-query";
import {
    IAddAccommodationUnitForm
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/model/types";
import {
    createAccommodationUnit
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useCreateAccommodationUnit() {


    return useMutation({
        mutationFn: (data: IAddAccommodationUnitForm) => createAccommodationUnit(data),
        onSuccess: async () => {
            toast.success("Юнит был создан.", {
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
            return error.message;
        }
    })
}