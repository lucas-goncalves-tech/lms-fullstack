import z from "zod";
import { baseLessonSchema } from "./base-lessons";

export const updateLessonSchema = z.object({
  ...baseLessonSchema,
  video: baseLessonSchema.video.optional(),
});

export type UpdateLesson = z.infer<typeof updateLessonSchema>;
