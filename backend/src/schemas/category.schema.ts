import { z } from "zod";

export const categoryCreateSchema = z.object({
    name: z
    .string()
    .min(2)
    .max(50)
    .trim(),
    description: z
    .string()
    .max(200).optional()
})

export const categoryUpdateSchema = z.object({
    name: z
    .string()
    .min(2)
    .max(50)
    .trim()
    .optional(),
    description: z
    .string()
    .max(200)
    .optional()
}).refine(
    d => Object.keys(d).length > 0, {message: "Nada para atualizar"}
)

// Schema para validação de IDs
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num: number) => num > 0, "ID deve ser positivo"),
});

export type categoryCreateData = z.infer<typeof categoryCreateSchema>;
export type categoryUpdateData = z.infer<typeof categoryUpdateSchema>;
export type IdParam = z.infer<typeof idParamSchema>;



