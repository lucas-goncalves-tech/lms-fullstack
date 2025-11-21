import { z } from "zod";

export const createLessonSchema = z
  .object({
    slug: z
      .string()
      .min(3, "Slug deve ter no mínimo 3 caracteres")
      .max(30, "Slug deve ter no máximo 30 caracteres")
      .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens")
      .transform((val) => val.toLowerCase().trim().replace(" ", "-")),

    title: z
      .string()
      .min(3, "Título deve ter no mínimo 3 caracteres")
      .max(30, "Título deve ter no máximo 30 caracteres")
      .transform((val) => val.trim()),

    seconds: z
      .number("Duração deve ser um número")
      .int("Duração deve ser um número inteiro")
      .nonnegative("Duração não pode ser negativa"),

    video: z.url("URL do vídeo inválida").or(z.string().min(1)),

    description: z
      .string()
      .min(10, "Descrição deve ter no mínimo 10 caracteres")
      .max(300, "Descrição deve ter no máximo 300 caracteres")
      .transform((val) => val.trim()),

    order: z.int().nonnegative(),

    free: z
      .boolean()
      .default(false)
      .transform((val) => (val ? 1 : 0)),
  })
  .strict();

export const createLessonParamsSchema = z.object({
  courseSlug: z
    .string()
    .min(5, "Slug do curso deve ter no mínimo 5 caracteres")
    .max(30, "Slug do curso deve ter no máximo 30 caracteres")
    .regex(/^[a-z0-9-]+$/, "Slug do curso deve conter apenas letras minúsculas, números e hífens")
    .transform((val) => val.toLowerCase().trim().replace(" ", "-")),
});

export type CreateLessonDTO = z.infer<typeof createLessonSchema>;
