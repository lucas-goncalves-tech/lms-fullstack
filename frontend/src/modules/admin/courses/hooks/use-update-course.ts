import { apiClient } from "@/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminCourseQueryKeys } from "./query-keys";
import { myCoursesKeys } from "@/modules/my-courses/hooks/query-keys";
import { getErrorMessage } from "@/lib/api/errors";

type UpdateCourseData = {
  title: string;
  description: string;
};

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      courseSlug,
      data,
    }: {
      courseSlug: string;
      data: UpdateCourseData;
    }) => {
      await apiClient.put(`/admin/courses/${courseSlug}/update`, data);
    },
    onSuccess: (_, variable) => {
      toast.success(`Curso "${variable.data.title}" atualizado com sucesso`);
      queryClient.invalidateQueries({
        queryKey: adminCourseQueryKeys.getAllCourses(),
      });
      queryClient.invalidateQueries({
        queryKey: myCoursesKeys.getAllCourses(),
      });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
