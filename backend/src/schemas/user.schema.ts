import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


export const createUserSchema = z.object({
    name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .trim(),
    email: z
    .string()
    .email("Email inválido")
    .max(120, "Email muito longo")
    .transform((v) => v.trim().toLowerCase()),
    password: z
    .string()
    .regex(
        passwordRegex, "Senha deve ter 8+ caracteres, com ao menos uma maiúscula, uma minúscula e um número"
    ),
});

export const userLoginSchema = z.object({
    email: z
    .string()
    .email("Email inválido")
    .transform((v) => v.trim().toLowerCase()),
    password: z.string().min(1, "Senha obrigatória"),
});

export const updateUserSchema = z.object({
    name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .trim()
    .optional(),

})
.refine(
    (data) => Object.keys(data).length > 0,
    {message: "Forneça ao menos um campo para atualizar"}
);

// Schema para validação de IDs
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num: number) => num > 0, "ID deve ser positivo"),
});

export type createUserData = z.infer<typeof createUserSchema>;
export type userLoginData = z.infer<typeof userLoginSchema>;
export type updateUserData = z.infer<typeof updateUserSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
