import z from "zod";

export const findManyCoursesReponse = z.array(
  z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
  })
);

export const adminMessageResponse = z.object({
  message: z.string(),
});

export const findManylessonsResponse = z.array(
  z.object({
    id: z.string(),
    courseId: z.string(),
    slug: z.string(),
    title: z.string(),
    seconds: z.number(),
    video: z.string(),
    description: z.string(),
    order: z.number(),
    created: z.string(),
  })
);

export const uploadVideoResponse = z.object({
  path: z.string(),
  seconds: z.number(),
});

export const uploadVideoHeaders = z.object({
  "x-filename": z.string(),
});

export const findManyUsersResponse = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    isActive: z.number(),
    total: z.number(),
  })
);
