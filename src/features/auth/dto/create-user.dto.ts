import { z } from "zod";

export const createUserSchema = z
  .strictObject({
    name: z.string("Nome inválido").nonempty().min(3).max(30).trim(),
    email: z.email("Email inválido").trim().toLowerCase(),
    password: z.string("Senha inválida").min(8).max(20).trim(),
    confirmPassword: z.string("Confirmação de senha inválida").min(8).max(20).trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type CreateUserDto = z.infer<typeof createUserSchema>;
