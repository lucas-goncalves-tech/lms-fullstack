import { z } from "zod";

export const completeLessonParamsSchema = z.object({
  courseSlug: z
    .string("courseSlug tem que ser uma string")
    .regex(/^[a-z0-9-]+$/, "courseSlug deve conter apenas letras minúsculas, números e hífens")
    .trim()
    .min(3, "courseSlug deve ter no mínimo 3 caracteres")
    .max(30, "courseSlug deve ter no máximo 30 caracteres"),
  lessonSlug: z
    .string("lessonSlug tem que ser uma string")
    .regex(/^[a-z0-9-]+$/, "lessonSlug deve conter apenas letras minúsculas, números e hífens")
    .trim()
    .min(3, "lessonSlug deve ter no mínimo 3 caracteres")
    .max(30, "lessonSlug deve ter no máximo 30 caracteres"),
});
