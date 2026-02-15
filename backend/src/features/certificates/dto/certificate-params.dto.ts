import { z } from "zod";

export const certificateIdParamsDto = z.object({
  certificateId: z.uuid("Formato invalido de ID").trim(),
});

export type CertificateIdParamsDto = z.infer<typeof certificateIdParamsDto>;
