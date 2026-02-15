import { zodPasswordValidator } from "@/lib/validators/common-fields";
import { zodSafeEmail } from "@/lib/validators/email";
import { zodSafeString } from "@/lib/validators/string.validator";
import z from "zod";

export const registerSchema = z
  .object({
    name: zodSafeString()
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .max(30, "Nome deve ter no máximo 30 caracteres"),
    email: zodSafeEmail(),
    password: zodPasswordValidator("Senha"),
    confirmPassword: zodPasswordValidator("Confirmação de senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
