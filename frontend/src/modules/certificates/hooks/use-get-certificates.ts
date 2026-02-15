import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { certificatesKeys } from "./query-key";
import { certificateSchema } from "../schemas/certificate";

export function useGetCertificates() {
  return useQuery({
    queryKey: certificatesKeys.getAll(),
    queryFn: async () => {
      const res = await apiClient.get("/certificates");
      return certificateSchema.array().parse(res.data);
    },
  });
}
