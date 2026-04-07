import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useUpdateAccommodationUnitPhotos
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/useUpdateAccommodationUnitPhotos";
import {
    UpdateUnitPhotosFormData,
    updateUnitPhotosSchema
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/schema";

interface UseEditUnitPhotosModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    id: number;
    initialImageUrls: string[];
}

export function useEditUnitPhotosModal({
                                           open,
                                           setOpen,
                                           id,
                                           initialImageUrls = [],
                                       }: UseEditUnitPhotosModalProps) {
    const { deletePhotoAsync, isUpdating, updatePhotosAsync } = useUpdateAccommodationUnitPhotos();
    const [imagePreviews, setImagePreviews] = useState<string[]>(initialImageUrls);
    const [deletedUrls, setDeletedUrls] = useState<string[]>([]);

    const form = useForm<UpdateUnitPhotosFormData>({
        resolver: zodResolver(updateUnitPhotosSchema),
        defaultValues: {
            images: [],
        },
    });

    useEffect(() => {
        if (open) {
            setImagePreviews(initialImageUrls || []);
            setDeletedUrls([]);
            form.reset({
                images: [],
            });
        }
    }, [initialImageUrls, open, form]);

    const handleImagesChange = useCallback((files: File[]) => {
        const currentImages = form.getValues("images") || [];
        const newImages = [...currentImages, ...files];

        form.setValue("images", newImages, { shouldValidate: true });

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews((prev) => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    }, [form]);

    const handleImageRemove = useCallback((index: number) => {
        const removedPreview = imagePreviews[index];
        const isExistingPhoto = initialImageUrls.includes(removedPreview);

        if (isExistingPhoto) {
            setDeletedUrls((prev) => [...prev, removedPreview]);
        } else {
            const currentImages = form.getValues("images");
            const fileIndex = index - initialImageUrls.length + deletedUrls.length;
            const newImages = currentImages.filter((_, i) => i !== fileIndex);
            form.setValue("images", newImages, { shouldValidate: true });
        }

        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }, [form, initialImageUrls, imagePreviews, deletedUrls.length]);

    const hasChanges = useCallback(() => {
        const hasNewImages = form.getValues("images").length > 0;
        const hasDeletedImages = deletedUrls.length > 0;
        return hasNewImages || hasDeletedImages;
    }, [form, deletedUrls.length]);

    const onSubmit = useCallback(async (data: UpdateUnitPhotosFormData) => {
        if (!hasChanges()) {
            form.setError("images", {
                type: "manual",
                message: "Не внесено никаких изменений"
            });
            return;
        }

        try {
            if (deletedUrls.length > 0) {
                await deletePhotoAsync({
                    id: String(id),
                    photoUrls: deletedUrls
                });
            }

            if (data.images.length > 0) {
                await updatePhotosAsync(
                    {
                        id: id,
                        images: data.images,
                    },
                    {
                        onSuccess: () => {
                            setOpen(false);
                            setImagePreviews([]);
                            setDeletedUrls([]);
                            form.reset();
                        },
                    }
                );
            } else {
                setOpen(false);
                setImagePreviews([]);
                setDeletedUrls([]);
                form.reset();
            }
        } catch (err) {
            console.error(err);
            form.setError("images", {
                type: "manual",
                message: "Ошибка при сохранении фотографий"
            });
        }
    }, [hasChanges, deletedUrls, form, deletePhotoAsync, id, updatePhotosAsync, setOpen]);

    return {
        form,
        imagePreviews,
        isUpdating,
        handleImagesChange,
        handleImageRemove,
        onSubmit,
    };
}