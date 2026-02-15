import { useQuery } from "@tanstack/react-query";
import { adminUsersQueryKeys } from "./query-keys";
import { apiClient } from "@/lib/api/client";

export function useGetUserAvatar(userId: string) {
  return useQuery({
    queryKey: adminUsersQueryKeys.getUserAvatar(userId),
    queryFn: async () => {
      const objectBlob = await apiClient.get(`/admin/users/${userId}/avatar`, {
        responseType: "blob",
      });
      const avatarUrl = URL.createObjectURL(objectBlob.data);
      return avatarUrl;
    },
  });
}
