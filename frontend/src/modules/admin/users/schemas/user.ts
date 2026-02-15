import {
  zodIntegerValidator,
  zodNameValdiator,
  zodRoleValidator,
} from "@/lib/validators/common-fields";
import { zodSafeEmail } from "@/lib/validators/email";
import z from "zod";

export const userTableSchema = z.object({
  id: z.uuid(),
  name: zodNameValdiator(),
  email: zodSafeEmail(),
  role: zodRoleValidator(),
  isActive: zodIntegerValidator(),
  total: zodIntegerValidator(),
});

export const usersTableSchema = z.array(userTableSchema);

export type IUserTable = z.infer<typeof userTableSchema>;
