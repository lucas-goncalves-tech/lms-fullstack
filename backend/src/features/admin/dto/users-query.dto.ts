import z from "zod";
import { zodIntegerValidator } from "../../../shared/validators/common-fields.validator";
import { zodSafeString } from "../../../shared/validators/string.validator copy";

export const userQuerySchema = z.strictObject({
  search: zodSafeString().optional(),
  limit: zodIntegerValidator().optional(),
  page: zodIntegerValidator().optional(),
});

export type UserQueryDTO = z.infer<typeof userQuerySchema>;
