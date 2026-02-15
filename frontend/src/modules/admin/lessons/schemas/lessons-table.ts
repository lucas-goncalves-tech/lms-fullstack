import {
  zodDescriptionValidator,
  zodIntegerValidator,
  zodSlugValidator,
  zodTitleValidator,
} from "@/lib/validators/common-fields";
import { zodSafeString } from "@/lib/validators/string.validator";
import z from "zod";

export const lessonTableSchema = z.object({
  id: z.uuid(),
  courseId: z.uuid(),
  slug: zodSlugValidator(),
  title: zodTitleValidator(),
  seconds: zodIntegerValidator(),
  video: zodSafeString(),
  description: zodDescriptionValidator(),
  order: zodIntegerValidator(),
  created: zodSafeString(),
});

export const lessonsTableSchema = z.array(lessonTableSchema);

export type LessonTable = z.infer<typeof lessonTableSchema>;
