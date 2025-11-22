import { z } from "zod";

export const createUserSchema = z.strictObject({
  name: z.string("Nome inválido").nonempty().min(3).max(30).trim(),
  email: z.email("Email inválido").trim().toLowerCase(),
  password: z.string("Senha inválida").min(8).max(20).trim(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
