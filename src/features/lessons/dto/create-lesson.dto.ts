import { z } from "zod";
import {
  zodSlugValidator,
  zodTitleValidator,
  zodDescriptionValidator,
} from "../../../shared/validators/common-fields.validator";

export const createLessonSchema = z.strictObject({
  slug: zodSlugValidator(),
  title: zodTitleValidator(),
  seconds: z
    .number("Duração deve ser um número")
    .int("Duração deve ser um número inteiro")
    .nonnegative("Duração não pode ser negativa"),
  video: z.url("URL do vídeo inválida").or(z.string().min(1).trim()),
  description: zodDescriptionValidator(),
  order: z.int("Ordem deve ser um número").nonnegative("Ordem não pode ser negativa"),
  free: z
    .number("Free deve ser um número")
    .refine((val) => [0, 1].includes(val), "Free deve ser 0 ou 1"),
});

export type CreateLessonDTO = z.infer<typeof createLessonSchema>;
