import { z } from "zod";
import { zodSlugValidator } from "../../../shared/validators/common-fields.validator";

export const completeLessonParamsSchema = z.object({
  courseSlug: zodSlugValidator("courseSlug"),
  lessonSlug: zodSlugValidator("lessonSlug"),
});
