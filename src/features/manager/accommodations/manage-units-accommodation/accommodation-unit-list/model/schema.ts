import { z } from "zod";

export const updateAccommodationUnitSchema = z.object({
    unitType: z.string().min(1, "Выберите тип"),
    name: z.string().min(1, "Имя обязательно"),
    description: z.string().min(1, "Описание обязательно"),
    capacity: z.coerce.number<number>().min(0, "Минимум 0").max(20, "Максимум 20"),
    area: z.coerce.number<number>().min(0, "Минимум 0").max(400, "Максимум 400"),
    floor: z.coerce.number<number>().min(0, "Минимум 0").max(100, "Максимум 100"),
    isAvailable: z.boolean(),
});

export type UpdateAccommodationUnitFormData = z.infer<typeof updateAccommodationUnitSchema>;

export const updateAccommodationUnitDictionariesSchema = z.object({
    serviceDictionaryIds: z.array(z.coerce.number<number>()),
    conditionDictionaryIds: z.array(z.coerce.number<number>()),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const updateUnitPhotosSchema = z.object({
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

export type UpdateAccommodationUnitDictionariesFormData = z.infer<typeof updateAccommodationUnitDictionariesSchema>;
export type UpdateUnitPhotosFormData = z.infer<typeof updateUnitPhotosSchema>;

export const createTariffSchema = z.object({
    price: z.coerce.number<number>().min(0.01, "Цена должна быть больше 0").max(1000000, "Максимальная цена 1,000,000"),
    currency: z.string().min(1, "Валюта обязательна"),
    rangeTypeId: z.coerce.number<number>().min(1, "Выберите тип диапазона"),
});

export type CreateTariffFormData = z.infer<typeof createTariffSchema>;