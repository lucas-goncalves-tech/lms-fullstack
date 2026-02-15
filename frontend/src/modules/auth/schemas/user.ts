import { zodSafeEmail } from "@/lib/validators/email";
import { zodSafeString } from "@/lib/validators/string.validator";
import z from "zod";

export const userSchema = z.object({
  name: zodSafeString(),
  email: zodSafeEmail(),
  role: z.enum(["ADMIN", "USER"]),
});

export type User = z.infer<typeof userSchema>;
