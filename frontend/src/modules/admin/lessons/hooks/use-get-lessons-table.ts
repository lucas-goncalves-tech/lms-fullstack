import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { adminLessonQueryKeys } from "./query-keys";
import { lessonsTableSchema } from "../schemas/lessons-table";

export function useGetLessonsTable(courseSlug: string) {
  return useQuery({
    queryKey: adminLessonQueryKeys.getAllLessons(courseSlug),
    queryFn: async () => {
      const response = await apiClient.get(`/admin/lessons/${courseSlug}`);
      return lessonsTableSchema.parse(response.data);
    },
  });
}
