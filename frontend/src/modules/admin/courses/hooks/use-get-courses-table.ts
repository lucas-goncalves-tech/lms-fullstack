import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { coursesFormSchema } from "../schemas/course-form";
import { adminCourseQueryKeys } from "./query-keys";

export function useGetCoursesTable() {
  return useQuery({
    queryKey: adminCourseQueryKeys.getAllCourses(),
    queryFn: async () => {
      const response = await apiClient.get("/admin/courses");
      return coursesFormSchema.parse(response.data);
    },
  });
}
