import { z } from "zod";
import {
  zodSlugValidator,
  zodTitleValidator,
  zodDescriptionValidator,
  zodIntegerValidator,
} from "../../../shared/validators/common-fields.validator";

export const createLessonSchema = z.strictObject({
  slug: zodSlugValidator(),
  title: zodTitleValidator(),
  seconds: zodIntegerValidator("Duração"),
  video: z.url("URL do vídeo inválida").or(z.string().min(1).trim()),
  description: zodDescriptionValidator(),
  order: zodIntegerValidator("Ordem"),
  free: zodIntegerValidator("Free").refine((val) => [0, 1].includes(val), "Free deve ser 0 ou 1"),
});

export type CreateLessonDTO = z.infer<typeof createLessonSchema>;
