import z from "zod";

export const createLessonParamsSchema = z.object({
  courseSlug: z
    .string()
    .min(5, "Slug do curso deve ter no mínimo 5 caracteres")
    .max(30, "Slug do curso deve ter no máximo 30 caracteres")
    .regex(/^[a-z0-9-]+$/, "Slug do curso deve conter apenas letras minúsculas, números e hífens")
    .transform((val) => val.toLowerCase().trim().replace(" ", "-")),
});
