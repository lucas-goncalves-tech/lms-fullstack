import { zodSafeString } from "@/lib/validators/string.validator";
import { lessonSchema } from "@/modules/course";
import z from "zod";

export const uniqueLessonSchema = lessonSchema.extend({
  prevLesson: zodSafeString().nullable(),
  nextLesson: zodSafeString().nullable(),
  completed: z.string(),
  videoUrl: zodSafeString(),
});

export type UniqueLesson = z.infer<typeof uniqueLessonSchema>;
