import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { adminLessonQueryKeys } from "./query-keys";
import { courseKeys } from "@/modules/course/hooks/query-keys";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";

interface UpdateLessonRequest {
  lessonSlug: string;
  title?: string;
  description?: string;
  order?: number;
  video?: string;
  seconds?: number;
}

export function useUpdateLesson(courseSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ lessonSlug, ...data }: UpdateLessonRequest) => {
      await apiClient.put(
        `/admin/lessons/${courseSlug}/${lessonSlug}/update`,
        data
      );
    },
    onSuccess: (_, variable) => {
      toast.success(
        `Aula "${variable.title ?? variable.lessonSlug}" atualizada com sucesso`
      );
      queryClient.invalidateQueries({
        queryKey: adminLessonQueryKeys.getAllLessons(courseSlug),
      });
      queryClient.invalidateQueries({
        queryKey: courseKeys.getAllLessons(courseSlug),
      });
      queryClient.invalidateQueries({
        queryKey: courseKeys.getCourse(courseSlug),
      });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
