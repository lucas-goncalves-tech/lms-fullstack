// x-filename.dto.ts
import z from "zod";
import path from "path";

const ALLOWED_EXTENSIONS = [".mp4", ".webm", ".mov", ".avi"];

export const xFilenameSchema = z
  .string()
  .min(1, "Nome do arquivo é obrigatório")
  .max(255, "Nome do arquivo muito longo")

  .refine((name) => !name.includes(".."), "Nome do arquivo inválido: path traversal não permitido")

  .refine(
    (name) => !name.includes("/") && !name.includes("\\"),
    "Nome do arquivo inválido: não pode conter barras"
  )
  .refine(
    // eslint-disable-next-line no-control-regex
    (name) => !/[<>:"|?*\u0000-\u001f]/.test(name),
    "Nome do arquivo contém caracteres inválidos"
  )

  .refine(
    (name) => {
      const ext = path.extname(name).toLowerCase();
      return ALLOWED_EXTENSIONS.includes(ext);
    },
    `Extensão não permitida. Permitidas: ${ALLOWED_EXTENSIONS.join(", ")}`
  )

  .transform((name) => path.basename(name));

export type XFilename = z.infer<typeof xFilenameSchema>;
