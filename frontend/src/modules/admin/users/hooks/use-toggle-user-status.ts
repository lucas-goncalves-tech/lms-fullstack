import { apiClient } from "@/lib/api/client";
import { getErrorMessage } from "@/lib/api/errors";
import { messageSchema } from "@/shared/schemas/message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminUsersQueryKeys } from "./query-keys";

export function useToggleUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await apiClient.patch(`/admin/users/${userId}/toggle-active`);
      return messageSchema.parse(res.data);
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: adminUsersQueryKeys.getAllUsers(),
      });
      toast.success(result.message);
    },
  });
}
