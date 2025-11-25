import { z } from 'zod';

export const taskCreateSchema = z.object({
    title: z
    .string()
    .min(3)
    .max(120)
    .trim(),
    priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .default("MEDIUM"),
    categoryId: z
    .number()
    .int()
    .positive()
    .optional()
});

export const taskUpdateSchema = z.object({
    title: z
    .string()
    .min(3)
    .max(120)
    .trim()
    .optional(),
    priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional(),
    categoryId: z
    .number()
    .int()
    .positive()
    .nullable()
    .optional()
})
.refine(d => Object.keys(d).length > 0, {message: "Nada para atualizar"})

export const toggleTaskSchema = z.object({
    id: z.number().int().positive()
});

// Schema para validação de IDs
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num: number) => num > 0, "ID deve ser positivo"),
});

export type taskCreateData = z.infer<typeof taskCreateSchema>;
export type taskUpdateData = z.infer<typeof taskUpdateSchema>;
export type IdParam = z.infer<typeof idParamSchema>;