import { z } from "zod";
import { zodSafeString } from "../../../shared/validators/string.validator copy";
import { zodSafeEmail } from "../../../shared/validators/email.validator";
import { zodPasswordValidator } from "../../../shared/validators/common-fields.validator";

export const createUserSchema = z
  .strictObject({
    name: zodSafeString()
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .max(30, "Nome deve ter no máximo 30 caracteres"),
    email: zodSafeEmail().trim().toLowerCase(),
    password: zodPasswordValidator("Senha"),
    confirmPassword: zodPasswordValidator("Confirmação de senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type CreateUserDto = z.infer<typeof createUserSchema>;
