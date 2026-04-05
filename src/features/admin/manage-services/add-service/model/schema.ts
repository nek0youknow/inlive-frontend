import * as z from "zod";

export const addServiceSchema = z.object({
    value: z.string().min(1, "Обязательное поле"),
});

export type AddServiceFormData = z.infer<typeof addServiceSchema>;