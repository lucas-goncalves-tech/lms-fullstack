import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { UniqueLesson } from "../schema/unique-lesson";
import { toast } from "sonner";
import { lessonKeys } from "./query-keys";

export function useCompleteLesson(courseSlug: string, lessonSlug: string) {
  const queryClient = useQueryClient();
  const queryKey = lessonKeys.getUniqueWithCourse(courseSlug, lessonSlug);

  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.get(
        `/lessons/${courseSlug}/${lessonSlug}/complete`
      );
      return res.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousLesson = queryClient.getQueryData<UniqueLesson>(queryKey);

      if (previousLesson) {
        queryClient.setQueryData<UniqueLesson>(queryKey, {
          ...previousLesson,
          completed: new Date().toISOString(),
        });
      }

      return { previousLesson };
    },
    onError: (_err, _variables, context) => {
      toast.error("Erro ao completar a aula");
      if (context?.previousLesson) {
        queryClient.setQueryData(queryKey, context.previousLesson);
      }
    },
    onSettled: () => {
      toast.success("Aula completada com sucesso");
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["lessons", courseSlug] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
