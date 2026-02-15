import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { uniqueLessonSchema } from "../schema/unique-lesson";
import { lessonKeys } from "./query-keys";

export function useGetUniqueLesson(courseSlug: string, lessonSlug: string) {
  return useQuery({
    queryKey: lessonKeys.getUniqueWithCourse(courseSlug, lessonSlug),
    queryFn: async () => {
      const response = await apiClient.get(
        `/lessons/${courseSlug}/${lessonSlug}`
      );
      return uniqueLessonSchema.parse(response.data);
    },
  });
}
