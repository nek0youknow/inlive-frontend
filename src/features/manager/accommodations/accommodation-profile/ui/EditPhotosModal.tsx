"use client"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { ImageUploader } from "@/widgets/images-uploader/ui/ImageUploader";
import {useEditPhotosModal} from "@/features/manager/accommodations/accommodation-profile/model/useEditPhotosModal";

interface EditPhotosModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    accommodationId: number;
    initialImageUrls?: string[];
}

export function EditPhotosModal({
                                    open,
                                    setOpen,
                                    accommodationId,
                                    initialImageUrls = [],
                                }: EditPhotosModalProps) {
    const {
        form,
        imagePreviews,
        isUpdating,
        handleImagesChange,
        handleImageRemove,
        onSubmit,
    } = useEditPhotosModal({
        open,
        setOpen,
        id: accommodationId,
        initialImageUrls,
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Редактировать фотографии</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <ImageUploader
                        images={imagePreviews}
                        onImagesChange={handleImagesChange}
                        onImageRemove={handleImageRemove}
                        error={form.formState.errors.images?.message as string}
                        maxImages={10}
                        label="Изображения"
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" disabled={isUpdating}>
                                Отмена
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isUpdating}>
                            {isUpdating ? "Сохранение..." : "Сохранить"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}