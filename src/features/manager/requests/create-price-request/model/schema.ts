import {z} from "zod";

export const createPriceRequestSchema = z.object({
    price: z.coerce
        .number<number>("Введите цену")
        .min(1, "Цена должна быть больше 0")
        .max(1000000, "Цена не может превышать 1,000,000"),
    unitId: z.coerce
        .number<number>()
        .min(1, "Выберите юнит")
});

export type CreatePriceRequestFormData = z.infer<typeof createPriceRequestSchema>;