"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { User, userSchema } from "../schemas/user";
import { useEffect } from "react";
import { useAuth } from "@/shared/context/auth";
import { useRouter } from "next/navigation";
import { authKeys } from "./query-keys";

export const useGetMe = (enabled = true) => {
  const { setUser, setIsLoading } = useAuth();
  const router = useRouter();
  const query = useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const response = await apiClient.get<User>("/auth/me");
      return userSchema.parse(response.data);
    },
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled,
  });

  useEffect(() => {
    if (query.error) {
      setUser(null);
      router.replace("/");
    }
    if (query.data) {
      setUser(query.data);
    }
    if (!query.isLoading) {
      setIsLoading(false);
    }
    //eslint-disable-next-line
  }, [query.data, query.error, query.isLoading, setIsLoading, setUser]);

  return query;
};
