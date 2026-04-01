"use client";
import {useState, useRef} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {Label} from "@/shared/ui/label";
import {useUpdateMyPhoto} from "@/entities/user/model/api/useUpdateMyPhoto";
import {useDeleteMyPhoto} from "@/entities/user/model/api/useDeleteMyPhoto";
import {photoSchema} from "@/widgets/user-profile/model/schema";
import {Camera, X, Trash2} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar";

interface EditPhotoModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    currentInitials: string;
    currentPhotoUrl?: string | null;
}

export function EditPhotoModal({
    open,
    setOpen,
    currentInitials,
    currentPhotoUrl
}: EditPhotoModalProps) {
    const {mutate: updatePhoto, isPending: isUpdating} = useUpdateMyPhoto();
    const {mutate: deletePhoto, isPending: isDeleting} = useDeleteMyPhoto();
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const isPending = isUpdating || isDeleting;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);

        try {
            photoSchema.parse(file);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (typeof err === 'object' && err !== null && 'errors' in err) {
                const zodError = err as { errors: Array<{ message: string }> };
                setError(zodError.errors[0]?.message || "Ошибка валидации файла");
            }
        }
    };

    const handleRemove = () => {
        setPreview(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = () => {
        if (!fileInputRef.current?.files?.[0]) {
            setError("Выберите файл");
            return;
        }

        const file = fileInputRef.current.files[0];
        
        try {
            photoSchema.parse(file);
            updatePhoto(file, {
                onSuccess: () => {
                    setOpen(false);
                    setPreview(null);
                    setError(null);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                },
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const handleDelete = () => {
        deletePhoto(undefined, {
            onSuccess: () => {
                setOpen(false);
                setPreview(null);
                setError(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    const handleClose = () => {
        setOpen(false);
        setPreview(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[95vw] sm:w-full max-w-sm max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Изменить фото профиля</DialogTitle>
                </DialogHeader>

                <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-center">
                        <Avatar className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-2 sm:border-4 border-gray-200">
                            {preview ? (
                                <AvatarImage src={preview} alt="Preview" className={"object-cover"} />
                            ) : currentPhotoUrl ? (
                                <AvatarImage src={currentPhotoUrl} alt="Current photo" className={"object-cover"} />
                            ) : (
                                <AvatarFallback className="bg-green-100 text-green-600 text-2xl sm:text-3xl md:text-4xl font-bold">
                                    {currentInitials}
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="photo" className="text-sm sm:text-base">Выберите фото</Label>
                        <div className="flex items-center gap-2">
                            <input
                                ref={fileInputRef}
                                id="photo"
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 text-sm sm:text-base"
                                disabled={isPending}
                            >
                                <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                Выбрать файл
                            </Button>
                            {preview && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleRemove}
                                    className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11"
                                    disabled={isPending}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                        {error && (
                            <p className="text-xs sm:text-sm text-red-500">{error}</p>
                        )}
                        <p className="text-xs text-gray-500">
                            Поддерживаемые форматы: JPG, PNG, WEBP. Максимальный размер: 5MB
                        </p>
                        {currentPhotoUrl && !preview && (
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={isPending}
                                className="w-full text-sm sm:text-base mt-2"
                            >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                Удалить текущее фото
                            </Button>
                        )}
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" disabled={isPending} className="w-full sm:w-auto">
                                Отмена
                            </Button>
                        </DialogClose>
                        <Button 
                            type="button" 
                            onClick={handleSubmit} 
                            disabled={isPending || !preview}
                            className="w-full sm:w-auto"
                        >
                            {isPending ? "Загрузка..." : "Сохранить"}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
