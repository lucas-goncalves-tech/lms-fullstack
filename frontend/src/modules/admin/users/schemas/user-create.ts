import {
  zodNameValdiator,
  zodPasswordValidator,
  zodRoleValidator,
} from "@/lib/validators/common-fields";
import { zodSafeEmail } from "@/lib/validators/email";
import z from "zod";

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

export type AdminCreateUser = z.infer<typeof adminCreateUserSchema>;
