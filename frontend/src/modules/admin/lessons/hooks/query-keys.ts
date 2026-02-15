export const adminLessonQueryKeys = {
  getAllLessons: (courseSlug: string) =>
    ["admin-lessons-table", courseSlug] as const,
};
