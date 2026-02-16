import z from "zod";

export const findLessonBySlugResponse = z.object({
  id: z.string().optional(),
  courseId: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  seconds: z.number().optional(),
  description: z.string().optional(),
  order: z.number().optional(),
  created: z.string().optional(),
  videoUrl: z.string().optional(),
  prevLesson: z.string().optional(),
  nextLesson: z.string().optional(),
  completed: z.string().optional(),
});

export const completeLessonResponse = z.object({
  completed: z.string().optional(),
  hasCertificate: z.string().optional(),
});

export const findManyByCourseSlugResponse = z.array(
  z.object({
    id: z.string().optional(),
    courseId: z.string().optional(),
    slug: z.string().optional(),
    title: z.string().optional(),
    seconds: z.number().optional(),
    description: z.string().optional(),
    order: z.number().optional(),
    created: z.string().optional(),
    completed: z.string().optional(),
  })
);
