import { z } from "zod";

export const courseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  created: z.string(),
  totalSeconds: z.number(),
  totalLessons: z.number(),
});
