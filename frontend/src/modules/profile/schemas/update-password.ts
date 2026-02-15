import { zodPasswordValidator } from "@/lib/validators/common-fields";
import { z } from "zod";

export const updatePasswordSchema = z
  .strictObject({
    currentPassword: zodPasswordValidator("Senha atual"),
    newPassword: zodPasswordValidator("Nova senha"),
    confirmPassword: zodPasswordValidator("Confirmação de nova senha"),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "A nova senha deve ser diferente da senha atual",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type UpdatePassword = z.infer<typeof updatePasswordSchema>;
