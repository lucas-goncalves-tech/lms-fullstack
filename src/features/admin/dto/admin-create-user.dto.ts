import z from "zod";
import {
  zodNameValdiator,
  zodPasswordValidator,
  zodRoleValidator,
} from "../../../shared/validators/common-fields.validator";
import { zodSafeEmail } from "../../../shared/validators/email.validator";

export const adminCreateUserSchema = z
  .strictObject({
    name: zodNameValdiator(),
    email: zodSafeEmail(),
    password: zodPasswordValidator(),
    confirmPassword: zodPasswordValidator(),
    role: zodRoleValidator(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type AdminCreateUserDTO = z.infer<typeof adminCreateUserSchema>;
