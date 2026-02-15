import { apiClient } from "@/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUsersQueryKeys } from "./query-keys";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      await apiClient.delete(`/admin/users/${userId}/delete`);
    },
    onSuccess: () => {
      toast.success("Usuário deletado com sucesso");
      queryClient.invalidateQueries({
        queryKey: adminUsersQueryKeys.getAllUsers(),
      });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
