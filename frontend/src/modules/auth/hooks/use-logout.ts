import { useAuth } from "@/shared/context/auth";
import { apiClient } from "@/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete("/auth/logout");
    },
    onSettled: () => {
      if (window !== undefined) {
        window.location.href = "/auth";
      }
      queryClient.clear();
      setUser(null);
    },
  });
};
