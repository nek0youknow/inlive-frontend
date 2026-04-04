import {z} from "zod";

export const changeConditionSchema = z.object({
    value: z.string().min(1, "Обязательное поле")
});

export type ChangeConditionFormData = z.infer<typeof changeConditionSchema>;