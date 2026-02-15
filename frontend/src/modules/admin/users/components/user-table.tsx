"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserActionsDropdown } from "./user-actions-dropdown";
import { UserCreateFormDialog } from "./user-create-form-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchIcon } from "lucide-react";
import { FormEvent, useRef } from "react";
import { useGetUsersTable } from "../hooks/use-get-users-table";
import { MobileCardSkeleton } from "../../shared/mobile-card-skeleton";
import { TableSkeleton } from "../../shared/table-skeleton";

export type UserForm = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  isActive: number;
};

const LIMIT_OPTIONS = [5, 10, 20, 50] as const;

export function UserTable() {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data,
    isLoading,
    isError,
    search,
    page,
    limit,
    setSearch,
    setLimit,
    goToPage,
  } = useGetUsersTable();

  const users = data?.users;
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearch(inputRef.current?.value ?? "");
  };

  return (
    <div className="space-y-4 pb-10">
      {/* Header: Search + Limit Select - Responsivo */}
      <form onSubmit={handleSearch} className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-1">
          <Input
            ref={inputRef}
            id="search-users"
            type="text"
            icon={SearchIcon}
            placeholder="Nome ou email..."
            defaultValue={search}
          />
          <Button type="submit" size="sm">
            Buscar
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Por página:
          </span>
          <Select
            value={String(limit)}
            onValueChange={(v) => setLimit(Number(v))}
          >
            <SelectTrigger size="sm" className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LIMIT_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={String(opt)}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>

      {/* Loading state */}
      {isLoading && (
        <>
          <MobileCardSkeleton />
          <TableSkeleton />
        </>
      )}

      {/* Error state */}
      {isError && (
        <div className="flex items-center justify-center py-8">
          <div className="text-destructive">Erro ao carregar usuários</div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && (!users || users.length === 0) && (
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Nenhum usuário encontrado</div>
        </div>
      )}

      {/* Mobile View - Cards */}
      {!isLoading && users && users.length > 0 && (
        <div className="block md:hidden space-y-3">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">
                      {user.name}
                    </h3>
                    <Badge
                      variant={user.role === "ADMIN" ? "default" : "secondary"}
                    >
                      {user.role}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 truncate">
                    {user.email}
                  </p>
                  <Badge
                    variant={user.isActive ? "outline" : "destructive"}
                    className="mt-2"
                  >
                    {user.isActive ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <UserActionsDropdown user={user} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Desktop View - Table */}
      {!isLoading && users && users.length > 0 && (
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nome</TableHead>
                <TableHead className="w-[250px]">Email</TableHead>
                <TableHead className="w-[100px]">Role</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[80px] text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground line-clamp-2">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "ADMIN" ? "default" : "secondary"}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "outline" : "destructive"}>
                      {user.isActive ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <UserActionsDropdown user={user} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination com botões de página */}
      {!isLoading &&
        !isError &&
        users &&
        users.length > 0 &&
        totalPages > 1 && (
          <div className="flex justify-end">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => page > 1 && goToPage(page - 1)}
                    className={
                      page <= 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={p === page}
                        onClick={() => goToPage(p)}
                        className="cursor-pointer"
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => page < totalPages && goToPage(page + 1)}
                    className={
                      page >= totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

      <UserCreateFormDialog />
    </div>
  );
}
