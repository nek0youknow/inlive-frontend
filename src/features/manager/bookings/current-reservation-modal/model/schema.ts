import {z} from "zod";

export const updateStatusSchema = z.object({
    status: z.string().min(1, "Выберите статус")
});

export type UpdateStatusFormData = z.infer<typeof updateStatusSchema>;