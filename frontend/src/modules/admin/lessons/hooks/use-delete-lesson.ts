import { apiClient } from "@/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminLessonQueryKeys } from "./query-keys";
import { getErrorMessage } from "@/lib/api/errors";
import { courseKeys } from "@/modules/course/hooks/query-keys";

export function useDeleteLesson(courseSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lessonSlug: string) => {
      await apiClient.delete(
        `/admin/lessons/${courseSlug}/${lessonSlug}/delete`
      );
    },
    onSuccess: (_, lessonSlug) => {
      toast.success(`Aula "${lessonSlug}" deletada com sucesso`);
      queryClient.invalidateQueries({
        queryKey: adminLessonQueryKeys.getAllLessons(courseSlug),
      });
      queryClient.invalidateQueries({
        queryKey: courseKeys.getAllLessons(courseSlug),
      });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
