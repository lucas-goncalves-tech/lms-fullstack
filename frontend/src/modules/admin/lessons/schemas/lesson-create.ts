import z from "zod";
import { baseLessonSchema } from "./base-lessons";

export const createLessonSchema = z.object(baseLessonSchema);
export type CreateLesson = z.infer<typeof createLessonSchema>;
