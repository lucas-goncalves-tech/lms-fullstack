import { zodRoleValidator } from "@/lib/validators/common-fields";
import { zodSafeString } from "@/lib/validators/string.validator";
import z from "zod";

export const userEditSchema = z.object({
  id: z.uuid(),
  name: zodSafeString(),
  role: zodRoleValidator(),
});

export type UserEditForm = z.infer<typeof userEditSchema>;
