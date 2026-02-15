import {
  zodDescriptionValidator,
  zodSlugValidator,
  zodTitleValidator,
} from "@/lib/validators/common-fields";
import { z } from "zod";

export const createCourseSchema = z.object({
  slug: zodSlugValidator(),
  title: zodTitleValidator(),
  description: zodDescriptionValidator(),
});

export type CreateCourse = z.infer<typeof createCourseSchema>;
