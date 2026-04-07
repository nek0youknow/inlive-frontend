import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateAccommodationTags, UpdateAccommodationTagsRequest} from "./updateApi";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {toast} from "sonner";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useUpdateAccommodationTags() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateAccommodationTagsRequest) => updateAccommodationTags(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["accommodation"]});
            toast.success("Теги успешно обновлены", {
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

