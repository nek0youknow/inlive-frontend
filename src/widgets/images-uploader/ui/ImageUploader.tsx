"use client"
import { useCallback } from "react";
import { X, Upload } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

interface ImageUploaderProps {
    images: string[];
    onImagesChange: (files: File[]) => void;
    onImageRemove: (index: number) => void;
    error?: string;
    maxImages?: number;
    label?: string;
}

export function ImageUploader({
                                  images,
                                  onImagesChange,
                                  onImageRemove,
                                  error,
                                  maxImages = 10,
                                  label = "Изображения",
                              }: ImageUploaderProps) {
    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();

            const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
                file.type.startsWith("image/")
            );

            if (droppedFiles.length > 0) {
                onImagesChange(droppedFiles);
            }
        },
        [onImagesChange]
    );

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFiles = Array.from(e.target.files || []);
            if (selectedFiles.length > 0) {
                onImagesChange(selectedFiles);
            }
        },
        [onImagesChange]
    );

    return (
        <fieldset className="flex flex-col gap-2">
            <Label>
                {label}
            </Label>

            <div className="flex flex-col gap-3">
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`
                        relative border-2 border-dashed rounded-lg p-8 text-center
                        transition-colors cursor-pointer hover:border-primary/50
                        ${error ? "border-red-500 hover:border-red-500/50" : "border-gray-300"}
                    `}
                >
                    <Input
                        id="file-upload"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        multiple
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {images.map((preview, index) => (
                                <div
                                    key={index}
                                    className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
                                >
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onImageRemove(index)}
                                        className="
                                        absolute top-2 right-2
                                        bg-red-500 hover:bg-red-600
                                        text-white rounded-full p-1.5
                                        opacity-0 group-hover:opacity-100
                                        transition-opacity duration-200
                                        shadow-lg
                                    "
                                        aria-label="Удалить изображение"
                                    >
                                        <X size={16} />
                                    </button>

                                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                        {index + 1} / {images.length}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 pointer-events-none">
                            <Upload className="w-10 h-10 text-gray-400" />
                            <div className="text-sm text-gray-600">
                            <span className="font-semibold text-primary">
                                Нажмите для выбора
                            </span>{" "}
                                или перетащите файлы сюда
                            </div>
                            <p className="text-xs text-gray-500">
                                PNG, JPG, WEBP до 5MB (максимум {maxImages} изображений)
                            </p>
                        </div>
                    )}
                </div>


                {/* Error message */}
                {error && <p className="text-sm text-red-500">{error}</p>}

                {/* Images counter */}
                {images.length > 0 && (
                    <p className="text-sm text-gray-600">
                        Загружено: {images.length} из {maxImages}
                    </p>
                )}
            </div>
        </fieldset>
    );
}