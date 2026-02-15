import z from "zod";

export const createUserResponseSchema = z.object({
  message: z.string(),
});
