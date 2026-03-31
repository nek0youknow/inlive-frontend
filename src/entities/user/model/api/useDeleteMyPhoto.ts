import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteMyPhoto} from "@/entities/user/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useDeleteMyPhoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteMyPhoto(),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user", "me"]});
            toast.success("Фото успешно удалено", {
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
                description: formattedError.description || "Не удалось удалить фото",
            });
        },
    });
}

