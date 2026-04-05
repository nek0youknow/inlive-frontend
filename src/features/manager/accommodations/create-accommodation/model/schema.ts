import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createAccommodationSchema = z.object({
    name: z.string().min(1, "Имя обязательно"),
    description: z.string().min(1, "Описание обязательно"),
    address: z.string().min(1, "Адрес обязателен"),
    cityId: z.string().min(1, "Город обязателен"),
    districtId: z.string().min(1, "Округ обязателен"),
    serviceDictionaryIds: z
        .array(z.coerce.number<number>())
        .min(1, "Выберите хотя бы один сервис"),
    conditionDictionaryIds: z
        .array(z.coerce.number<number>())
        .min(1, "Выберите хотя бы одно условие"),
    rating: z.coerce.number<number>().min(0, "Минимум 0").max(5, "Максимум 5"),
    images: z
        .array(
            z.instanceof(File)
                .refine((file) => file.size <= MAX_FILE_SIZE, "Максимальный размер файла 5MB")
                .refine(
                    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
                    "Только .jpg, .jpeg, .png и .webp форматы поддерживаются"
                )
        )
        .min(1, "Необходимо загрузить хотя бы одно изображение")
        .max(10, "Максимум 10 изображений"),
});

export type CreateAccommodationFormData = z.infer<typeof createAccommodationSchema>;