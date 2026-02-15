import z from "zod";
import { zodSlugValidator } from "../../../shared/validators/common-fields.validator";

export const lessonSlugParamsSchema = z.object({
  courseSlug: zodSlugValidator("courseSlug"),
  lessonSlug: zodSlugValidator("lessonSlug"),
});
