import { apiClient } from "@/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { adminLessonQueryKeys } from "./query-keys";
import { courseKeys } from "@/modules/course";

interface CreateLessonRequest {
  slug: string;
  title: string;
  description: string;
  order: number;
  video: string;
  seconds: number;
}

export function useCreateLesson(courseSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateLessonRequest) => {
      await apiClient.post(`/admin/lessons/${courseSlug}/new`, data);
    },
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({
        queryKey: adminLessonQueryKeys.getAllLessons(courseSlug),
      });
      queryClient.invalidateQueries({
        queryKey: courseKeys.getAllLessons(courseSlug),
      });
      queryClient.invalidateQueries({
        queryKey: courseKeys.getCourse(courseSlug),
      });
      toast.success(`Aula "${variable.title}" criada com sucesso`);
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
