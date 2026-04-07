import {z} from "zod";

export const updatePriceSchema = z.object({
    price: z.coerce
        .number<number>("Введите цену")
        .min(1, "Цена должна быть больше 0")
        .max(1000000, "Цена не может превышать 1,000,000"),
});


export type UpdatePriceFormData = z.infer<typeof updatePriceSchema>;