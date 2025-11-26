import { z } from "zod";

export const updatePasswordSchema = z
  .strictObject(
    {
      currentPassword: z.string("Senha inválida").min(8).max(20).trim(),
      newPassword: z.string("Confirmação de senha inválida").min(8).max(20).trim(),
      confirmPassword: z.string("Confirmação de senha inválida").min(8).max(20).trim(),
    },
    "Formato inválido, necessario um JSON"
  )
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "A nova senha deve ser diferente da senha atual",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type UpdatePasswordDto = z.infer<typeof updatePasswordSchema>;
