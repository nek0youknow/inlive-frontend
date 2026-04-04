import {z } from "zod";

export const addConditionSchema = z.object({
    value: z.string().min(1, "Обязательное поле")
});

export type AddConditionFormData = z.infer<typeof addConditionSchema>;
