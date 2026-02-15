import { z } from "zod";
import { zodSafeEmail } from "../../../shared/validators/email.validator";

export const updateEmailSchema = z.strictObject({
  email: zodSafeEmail(),
});

export type UpdateEmailDTO = z.infer<typeof updateEmailSchema>;
