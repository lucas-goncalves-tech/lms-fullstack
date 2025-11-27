import { z } from "zod";
import {
  zodSlugValidator,
  zodTitleValidator,
  zodDescriptionValidator,
  zodIntegerValidator,
} from "../../../shared/validators/common-fields.validator";

export const createCourseSchema = z.strictObject({
  slug: zodSlugValidator(),
  title: zodTitleValidator(),
  description: zodDescriptionValidator(),
  lessons: zodIntegerValidator("Aulas"),
  hours: zodIntegerValidator("Horas"),
});

export type CreateCourseDTO = z.infer<typeof createCourseSchema>;
