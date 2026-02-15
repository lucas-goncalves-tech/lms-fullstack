import { zodPasswordValidator } from "@/lib/validators/common-fields";
import { zodSafeEmail } from "@/lib/validators/email";
import { z } from "zod";

export const loginSchema = z.object({
  email: zodSafeEmail(),
  password: zodPasswordValidator(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
