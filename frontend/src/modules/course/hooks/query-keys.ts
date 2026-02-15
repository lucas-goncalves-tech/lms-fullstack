export const courseKeys = {
  getAll: () => ["course"] as const,
  getCourse: (courseSlug: string) => ["course", courseSlug] as const,

  getAllLessons: (courseSlug: string) => ["lessons", courseSlug] as const,
};
