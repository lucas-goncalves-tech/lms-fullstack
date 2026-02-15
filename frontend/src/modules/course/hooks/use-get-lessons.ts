import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { lessonsSchema } from "../schemas/lesson";
import { courseKeys } from "./query-keys";

export function useGetLessons(courseSlug: string) {
  return useQuery({
    queryKey: courseKeys.getAllLessons(courseSlug),
    queryFn: async () => {
      const response = await apiClient.get(`/lessons/${courseSlug}`);
      return lessonsSchema.parse(response.data);
    },
  });
}
