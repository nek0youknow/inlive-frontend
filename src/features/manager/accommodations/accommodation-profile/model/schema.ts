import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const updateMainInfoSchema = z.object({
    name: z.string().min(1, "Название обязательно"),
    description: z.string().min(1, "Описание обязательно"),
    address: z.string().min(1, "Адрес обязателен"),
    cityId: z.string().min(1, "Город обязателен"),
    districtId: z.string().min(1, "Округ обязателен"),
    rating: z.number().min(0, "Минимум 0").max(5, "Максимум 5"),
});

export type UpdateMainInfoFormData = z.infer<typeof updateMainInfoSchema>;

export const updateTagsSchema = z.object({
    serviceIds: z.array(z.number()),
    conditionIds: z.array(z.number()),
});

export type UpdateTagsFormData = z.infer<typeof updateTagsSchema>;

export const updatePhotosSchema = z.object({
    images: z
        .array(
            z.instanceof(File)
                .refine((file) => file.size <= MAX_FILE_SIZE, "Максимальный размер файла 5MB")
                .refine(
                    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
                    "Только .jpg, .jpeg, .png и .webp форматы поддерживаются"
                )
        )
        .max(10, "Максимум 10 изображений"),
});

export type UpdatePhotosFormData = z.infer<typeof updatePhotosSchema>;

