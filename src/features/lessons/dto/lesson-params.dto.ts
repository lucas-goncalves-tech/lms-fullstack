import z from "zod";
import { zodSlugValidator } from "../../../shared/validators/common-fields.validator";

export const LessonParamsSchema = z.object({
  courseSlug: zodSlugValidator("courseSlug"),
});

export const findLessonParamsSchema = z.object({
  courseSlug: zodSlugValidator("courseSlug"),
  lessonSlug: zodSlugValidator("lessonSlug"),
});
