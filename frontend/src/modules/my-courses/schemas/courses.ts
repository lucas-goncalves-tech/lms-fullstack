import {
  zodDescriptionValidator,
  zodIntegerValidator,
  zodSlugValidator,
  zodTitleValidator,
} from "@/lib/validators/common-fields";
import { zodSafeString } from "@/lib/validators/string.validator";
import { z } from "zod";

export const courseSchema = z.object({
  id: z.uuid(),
  slug: zodSlugValidator(),
  title: zodTitleValidator(),
  description: zodDescriptionValidator(),
  totalSeconds: zodIntegerValidator(),
  totalLessons: zodIntegerValidator(),
  completedLessons: zodIntegerValidator(),
  created: zodSafeString(),
});

export const coursesSchema = z.array(courseSchema);

export type Course = z.infer<typeof courseSchema>;
