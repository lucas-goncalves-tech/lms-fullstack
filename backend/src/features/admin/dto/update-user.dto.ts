import z from "zod";
import {
  zodNameValdiator,
  zodRoleValidator,
} from "../../../shared/validators/common-fields.validator";

export const updateUserSchema = z
  .strictObject({
    name: zodNameValdiator().optional(),
    role: zodRoleValidator().optional(),
  })
  .refine((data) => Object.entries(data).length > 0, {
    message: "Pelo menos um campo deve ser informado",
  });

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
