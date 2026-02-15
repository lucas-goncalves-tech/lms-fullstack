import { apiClient } from "@/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserEditForm } from "../schemas/user-edit";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { adminUsersQueryKeys } from "./query-keys";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: UserEditForm) => {
      const response = await apiClient.put(`/admin/users/${user.id}/update`, {
        name: user.name,
        role: user.role,
      });
      return response.data;
    },
    onSuccess: (_, variable) => {
      toast.success(`Usuário "${variable.name}" atualizado com sucesso`);
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
