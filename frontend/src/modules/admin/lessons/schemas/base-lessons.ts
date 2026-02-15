import {
  zodDescriptionValidator,
  zodIntegerValidator,
  zodSlugValidator,
  zodTitleValidator,
} from "@/lib/validators/common-fields";
import z from "zod";

export const baseLessonSchema = {
  slug: zodSlugValidator(),
  title: zodTitleValidator(),
  description: zodDescriptionValidator(),
  order: zodIntegerValidator(),
  video: z
    .instanceof(File, { message: "Arquivo de vídeo é obrigatório" })
    .refine((file) => file.size > 0, "Arquivo não pode estar vazio")
    .refine(
      (file) => file.type.startsWith("video/"),
      "Arquivo deve ser um vídeo"
    ),
};
