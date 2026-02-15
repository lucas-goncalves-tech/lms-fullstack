import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCourse } from "../schemas/create-course";
import { apiClient } from "@/lib/api/client";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { adminCourseQueryKeys } from "./query-keys";
import { myCoursesKeys } from "@/modules/my-courses/hooks/query-keys";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCourse) => {
      await apiClient.post("/admin/courses/new", data);
    },
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({
        queryKey: adminCourseQueryKeys.getAllCourses(),
      });
      queryClient.invalidateQueries({
        queryKey: myCoursesKeys.getAllCourses(),
      });
      toast.success(`${variable.title} criado com sucesso`);
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
