import { z } from "zod";

export const adminLoginSchema = z.object({
    email: z.email('Введите корректный email').min(1, 'Email обязателен'),
    password: z.string().min(8, 'Пароль должен быть не менее 6 символов')
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;