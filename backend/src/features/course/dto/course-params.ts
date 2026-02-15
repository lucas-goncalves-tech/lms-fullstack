import z from "zod";
import { zodSlugValidator } from "../../../shared/validators/common-fields.validator";

export const courseSlugParamsSchema = z.object({
  courseSlug: zodSlugValidator("courseSlug"),
});
