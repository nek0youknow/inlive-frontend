"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    approveAccommodation,
    getAccommodation, rejectAccommodation
} from "@/features/admin/approve-accommodation/accommodation-table/model/api/api";
import {
    useAccommodationFilter
} from "@/features/admin/approve-accommodation/filter-accommodation/model/store/useAccommodationFilter";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {formatErrorForToast} from "@/shared/lib/error/formatError";


export function useAccommodations() {
    const queryClient = useQueryClient();


    const {filters} = useAccommodationFilter();

    const accommodationsQuery = useQuery({
        queryKey: ["accommodations-list", filters],
        queryFn: async () => await getAccommodation(filters),
    });

    const approveMutation = useMutation({
        mutationFn: (id: string) => approveAccommodation(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["accommodations-list"] });
            toast.success("Accommodations одобрен.", {
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
        }
    });

    const rejectMutation = useMutation({
        mutationFn: (id: string) => rejectAccommodation(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["accommodations-list"] });
            toast.info("Accommodations отклонен.", {
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
        }
    });

    return {
        ...accommodationsQuery,
        approveAccommodation: approveMutation.mutate,
        rejectAccommodation: rejectMutation.mutate,
        approving: approveMutation.isPending,
        rejecting: rejectMutation.isPending,
    };
}
