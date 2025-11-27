import { z } from "zod";
import {
  zodSlugValidator,
  zodTitleValidator,
  zodDescriptionValidator,
} from "../../../shared/validators/common-fields.validator";

export const createCourseSchema = z.strictObject({
  slug: zodSlugValidator(),
  title: zodTitleValidator(),
  description: zodDescriptionValidator(),
  lessons: z.int().nonnegative(),
  hours: z.int().nonnegative(),
});

export type CreateCourseDTO = z.infer<typeof createCourseSchema>;
