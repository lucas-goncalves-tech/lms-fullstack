export const lessonKeys = {
  getUniqueWithCourse: (courseSlug: string, lessonSlug: string) =>
    ["lesson", courseSlug, lessonSlug] as const,
  getAllUnique: (courseSlug: string) => ["lesson", courseSlug] as const,
};
