import z from "zod";

export const loginUserSchema = z.strictObject({
  email: z.email("Email inválido").trim().toLowerCase(),
  password: z
    .string("Senha inválida")
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(20, "Senha deve ter no máximo 20 caracteres")
    .trim(),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;
