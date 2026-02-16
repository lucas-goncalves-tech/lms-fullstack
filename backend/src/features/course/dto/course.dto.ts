import z from "zod";

export const findCourseSchema = z.object({
  id: z.string().nullable(),
  slug: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  created: z.string().nullable(),
  totalSeconds: z.number().nullable(),
  totalLessons: z.number().nullable(),
});

export const findManyWithProgressDto = z.array(
  findCourseSchema.extend({
    completedLessons: z.number().nullable(),
  })
);
