import { apiClient } from "@/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminCreateUser } from "../schemas/user-create";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { adminUsersQueryKeys } from "./query-keys";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: AdminCreateUser) => {
      await apiClient.post("/admin/users/new", user);
    },
    onSuccess: (_, variable) => {
      toast.success(`Usuário "${variable.name}" criado com sucesso`);
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
