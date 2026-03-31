import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateMe} from "@/entities/user/model/api/api";
import {UpdateUserRequest} from "@/entities/user/model/types";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useUpdateMe() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUserRequest) => updateMe(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user", "me"]});
            toast.success("Профиль успешно обновлен", {
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
                description: formattedError.description || "Не удалось обновить профиль",
            });
        },
    });
}

