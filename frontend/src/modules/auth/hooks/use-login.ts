import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginSchema } from "../schemas/login";
import { apiClient } from "@/lib/api/client";
import { authKeys } from "./query-keys";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const response = await apiClient.post("/auth", data);
      return response.data;
    },
    onMutate: () => {
      queryClient.clear();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
