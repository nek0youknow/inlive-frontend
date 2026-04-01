import {z} from "zod";

export const updateRequestPriceSchema = z.object({
    price: z.coerce
        .number<number>("Введите цену")
        .min(1, "Цена должна быть больше 0")
        .max(1000000, "Цена не может превышать 1,000,000"),
})

export type UpdateRequestPriceFormData = z.infer<typeof updateRequestPriceSchema>;