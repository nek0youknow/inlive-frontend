import {z} from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const updateProfileSchema = z.object({
    firstName: z.string().min(1, "Имя обязательно"),
    lastName: z.string().min(1, "Фамилия обязательна"),
    email: z.string().email("Некорректный email"),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export const photoSchema = z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Максимальный размер файла 5MB")
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Только .jpg, .jpeg, .png и .webp форматы поддерживаются"
    );
