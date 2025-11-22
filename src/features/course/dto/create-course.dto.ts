import { z } from "zod";

export const createCourseSchema = z
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

    description: z
      .string()
      .min(10, "Descrição deve ter no mínimo 10 caracteres")
      .max(300, "Descrição deve ter no máximo 300 caracteres")
      .transform((val) => val.trim()),
    lessons: z.int().nonnegative(),
    hours: z.int().nonnegative(),
  })
  .strict();

export type CreateCourseDTO = z.infer<typeof createCourseSchema>;
