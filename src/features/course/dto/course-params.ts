import z from "zod";
import { zodSlugValidator } from "../../../shared/validators/common-fields.validator";

export const CourseSlugParamsSchema = z.object({
  courseSlug: zodSlugValidator("courseSlug"),
});
