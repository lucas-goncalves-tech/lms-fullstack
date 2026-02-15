import { zodSafeEmail } from "@/lib/validators/email";
import { z } from "zod";

export const updateEmailSchema = z.strictObject({
  email: zodSafeEmail(),
});

export type UpdateEmail = z.infer<typeof updateEmailSchema>;
