import { z } from "zod";

export const createLessonSchema = z.strictObject({
  slug: z
    .string("Slug deve ser uma string")
    .min(3, "Slug deve ter no mínimo 3 caracteres")
    .max(30, "Slug deve ter no máximo 30 caracteres")
    .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens")
    .transform((val) => val.toLowerCase().trim().replace(" ", "-")),

  title: z
    .string("Título deve ser uma string")
    .min(3, "Título deve ter no mínimo 3 caracteres")
    .max(30, "Título deve ter no máximo 30 caracteres")
    .transform((val) => val.trim()),

  seconds: z
    .number("Duração deve ser um número")
    .int("Duração deve ser um número inteiro")
    .nonnegative("Duração não pode ser negativa"),

  video: z.url("URL do vídeo inválida").or(z.string().min(1)),

  description: z
    .string("Descrição deve ser uma string")
    .min(10, "Descrição deve ter no mínimo 10 caracteres")
    .max(300, "Descrição deve ter no máximo 300 caracteres")
    .transform((val) => val.trim()),

  order: z.int("Ordem deve ser um número").nonnegative("Ordem não pode ser negativa"),

  free: z
    .number("Free deve ser um número")
    .refine((val) => [0, 1].includes(val), "Free deve ser 0 ou 1"),
});

export type CreateLessonDTO = z.infer<typeof createLessonSchema>;
