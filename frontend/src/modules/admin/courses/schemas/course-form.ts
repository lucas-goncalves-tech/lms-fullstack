import { z } from "zod";
import {
  zodDescriptionValidator,
  zodSlugValidator,
  zodTitleValidator,
} from "@/lib/validators/common-fields";

export const courseFormSchema = z.object({
  title: zodTitleValidator(),
  description: zodDescriptionValidator(),
  slug: zodSlugValidator(),
});

export const coursesFormSchema = z.array(courseFormSchema);

export type CourseForm = z.infer<typeof courseFormSchema>;
