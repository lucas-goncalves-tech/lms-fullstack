import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";

export const avatarKeys = {
  unique: () => ["avatar"] as const,
};

export function useAvatar() {
  return useQuery({
    queryKey: avatarKeys.unique(),
    queryFn: async () => {
      const response = await apiClient.get("/user/avatar", {
        responseType: "blob",
      });
      return URL.createObjectURL(response.data) ?? null;
    },
    staleTime: Infinity,
  });
}
