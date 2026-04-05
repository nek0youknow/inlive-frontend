import {z} from "zod";

export const changeServiceSchema = z.object({
    value: z.string().min(1, "Обязательное поле")
});

export type ChangeServiceFormData = z.infer<typeof changeServiceSchema>;