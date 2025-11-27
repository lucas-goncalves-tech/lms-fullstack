import z from "zod";
import { zodSafeEmail } from "../../../shared/validators/email.validator";
import { zodPasswordValidator } from "../../../shared/validators/common-fields.validator";

export const loginUserSchema = z.strictObject({
  email: zodSafeEmail(),
  password: zodPasswordValidator("Senha").trim(),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;
