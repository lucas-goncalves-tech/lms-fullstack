import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { courseKeys } from "./query-keys";
import { courseSchema } from "../schemas/course";

export function useGetCourse(courseSlug: string) {
  return useQuery({
    queryKey: courseKeys.getCourse(courseSlug),
    queryFn: async () => {
      const response = await apiClient.get(`/courses/${courseSlug}`);
      return courseSchema.parse(response.data);
    },
  });
}
