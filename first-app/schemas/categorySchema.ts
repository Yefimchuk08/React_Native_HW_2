import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(1, "Назва обов'язкове"),
    description: z.string().min(4, "Опис обов'язкове"),
});

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;