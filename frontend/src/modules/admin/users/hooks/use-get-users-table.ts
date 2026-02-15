import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { adminUsersQueryKeys } from "./query-keys";
import { apiClient } from "@/lib/api/client";
import { usersTableSchema } from "../schemas/user";

const DEFAULT_LIMIT = 10;

export function useGetUsersTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL como single source of truth
  const search = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;

  // Função reutilizável para atualizar URL
  const updateUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const query = useQuery({
    queryKey: adminUsersQueryKeys.getAllUsers({ search, page, limit }),
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (search) queryParams.set("search", search);
      queryParams.set("page", String(page));
      queryParams.set("limit", String(limit));

      const res = await apiClient.get(`/admin/users?${queryParams.toString()}`);
      const users = usersTableSchema.parse(res.data);
      const total = users[0]?.total ?? 0;
      const totalPages = Math.ceil(total / limit);
      return { users, total, totalPages };
    },
  });

  return {
    ...query,
    // Valores atuais da URL
    search,
    page,
    limit,
    // Ações de navegação
    setSearch: (value: string) =>
      updateUrl({ search: value || null, page: "1" }),
    setLimit: (value: number) => updateUrl({ limit: String(value), page: "1" }),
    goToPage: (newPage: number) => updateUrl({ page: String(newPage) }),
  };
}
