import z from "zod";
import { zodSlugValidator } from "../../../shared/validators/common-fields.validator";

export const findLessonParamsSchema = z.object({
  courseSlug: zodSlugValidator("courseSlug"),
  lessonSlug: zodSlugValidator("lessonSlug"),
});
