import { z } from "zod";
import {
  zodSlugValidator,
  zodTitleValidator,
  zodDescriptionValidator,
  zodIntegerValidator,
} from "../../../shared/validators/common-fields.validator";
import { zodSafeString } from "../../../shared/validators/string.validator copy";

export const updateLessonSchema = z.strictObject({
  slug: zodSlugValidator().optional(),
  title: zodTitleValidator().optional(),
  description: zodDescriptionValidator().optional(),
  video: zodSafeString().optional(),
  seconds: zodIntegerValidator("Duração").optional(),
  order: zodIntegerValidator("Ordem").optional(),
});

export type UpdateLessonDTO = z.infer<typeof updateLessonSchema>;
