import z from "zod";
import {
  zodDescriptionValidator,
  zodTitleValidator,
} from "../../../shared/validators/common-fields.validator";

export const updateCourseSchema = z.strictObject({
  title: zodTitleValidator(),
  description: zodDescriptionValidator(),
});

export type UpdateCourseDTO = z.infer<typeof updateCourseSchema>;
