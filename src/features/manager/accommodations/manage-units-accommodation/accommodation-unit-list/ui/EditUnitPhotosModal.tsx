"use client"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { ImageUploader } from "@/widgets/images-uploader/ui/ImageUploader";
import {
    useEditUnitPhotosModal
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/useEditUnitPhotosModal";

interface EditUnitPhotosModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    unitId: number;
    initialImageUrls?: string[];
}

export function EditUnitPhotosModal({
                                    open,
                                    setOpen,
                                    unitId,
                                    initialImageUrls = [],
                                }: EditUnitPhotosModalProps) {
    const {
        form,
        imagePreviews,
        isUpdating,
        handleImagesChange,
        handleImageRemove,
        onSubmit,
    } = useEditUnitPhotosModal({
        open,
        setOpen,
        id:unitId,
        initialImageUrls,
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[95vw] sm:w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Редактировать фотографии</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                    <ImageUploader
                        images={imagePreviews}
                        onImagesChange={handleImagesChange}
                        onImageRemove={handleImageRemove}
                        error={form.formState.errors.images?.message as string}
                        maxImages={10}
                        label="Изображения"
                    />

                    <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" disabled={isUpdating} className="w-full sm:w-auto">
                                Отмена
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isUpdating} className="w-full sm:w-auto">
                            {isUpdating ? "Сохранение..." : "Сохранить"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}