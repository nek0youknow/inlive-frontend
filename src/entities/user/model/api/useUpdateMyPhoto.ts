import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateMyPhoto} from "@/entities/user/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useUpdateMyPhoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (photo: File) => updateMyPhoto(photo),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user", "me"]});
            toast.success("Фото успешно обновлено", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime(),
            });
        },
        onError: (error) => {
            const formattedError = formatErrorForToast(error);
            toast.error(formattedError.message, {
                position: "top-right",
                richColors: true,
                description: formattedError.description || "Не удалось обновить фото",
            });
        },
    });
}

