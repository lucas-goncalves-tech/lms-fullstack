import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { coursesSchema } from "../schemas/courses";
import { myCoursesKeys } from "./query-keys";

export function useGetCourses() {
  return useQuery({
    queryKey: myCoursesKeys.getAllCourses(),
    queryFn: async () => {
      const response = await apiClient.get("/courses");
      return coursesSchema.parse(response.data);
    },
  });
}
