import {
  zodDescriptionValidator,
  zodIntegerValidator,
  zodSlugValidator,
  zodTitleValidator,
} from "@/lib/validators/common-fields";
import { zodSafeString } from "@/lib/validators/string.validator";
import z from "zod";

export const lessonSchema = z.object({
  id: z.uuid(),
  courseId: z.uuid(),
  slug: zodSlugValidator(),
  title: zodTitleValidator(),
  description: zodDescriptionValidator(),
  seconds: zodIntegerValidator(),
  order: zodIntegerValidator(),
  created: zodSafeString(),
  completed: zodSafeString().nullable(),
});
export const lessonsSchema = z.array(lessonSchema);

export type Lesson = z.infer<typeof lessonSchema>;
