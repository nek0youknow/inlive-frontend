import {useMutation, useQueryClient} from "@tanstack/react-query";

import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {toast} from "sonner";
import {
    UpdateAccommodationUnitPhotosRequest,
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/types";
import {
    deleteAccommodationUnitPhoto,
    updateAccommodationUnitPhotos
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/api";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useUpdateAccommodationUnitPhotos() {
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: (data: UpdateAccommodationUnitPhotosRequest) =>
            updateAccommodationUnitPhotos(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["accommodation"]});
            toast.success("Фотографии успешно обновлены", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime(),
            });
        },
        onError: async (error) => {
            const formattedError = formatErrorForToast(error);
            toast.error(formattedError.message, {
                position: "top-right",
                richColors: true,
                description: formattedError.description || "Проверьте данные и попробуйте снова",
            });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (data: { id: string; photoUrls: string[] }) =>
            deleteAccommodationUnitPhoto(data.id, data.photoUrls),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["accommodation"]});
            toast.success("Фотографии удалены", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime(),
            });
        },
        onError: async (error) => {
            const formattedError = formatErrorForToast(error);
            toast.error(formattedError.message, {
                position: "top-right",
                richColors: true,
                description: formattedError.description || "Не удалось удалить фото",
            });
        },
    });

    return {
        updatePhotos: updateMutation.mutate,
        updatePhotosAsync: updateMutation.mutateAsync,
        deletePhoto: deleteMutation.mutate,
        deletePhotoAsync: deleteMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
}
