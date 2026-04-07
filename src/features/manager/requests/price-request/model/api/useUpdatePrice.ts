import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "@/shared/api/axiosInstance";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useUpdatePrice(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { price: number; searchRequestId: number }) => {
            const res = await api.put(`/price-requests/${data.searchRequestId}`, {
                price: data.price,
            });

            return res.data;
        },

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['relevant-requests'] }),
                queryClient.invalidateQueries({ queryKey: ['price-request', id] }),
            ]);

            toast.success("Заявка цены была обновлена.", {
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
                description:
                    formattedError.description || "Проверьте данные и попробуйте снова",
            });
        },
    });
}
