import { apiClient } from "@/lib/api/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { videoPathSchema } from "../schemas/lessons-path";

export function useUploadVideo() {
  return useMutation({
    mutationFn: async (video: File) => {
      const res = await apiClient.post("/admin/lessons/upload-video", video, {
        headers: {
          "Content-Type": "application/octet-stream",
          "x-filename": video.name,
        },
      });

      return videoPathSchema.parse(res.data);
    },
    onError: () => {
      toast.error(
        "Erro de conexão. Verifique sua internet ou se o arquivo é maior que 500mb."
      );
    },
  });
}
