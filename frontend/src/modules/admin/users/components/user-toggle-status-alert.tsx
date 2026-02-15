"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Power } from "lucide-react";
import { useState } from "react";
import { UserForm } from "./user-table";
import { useToggleUserStatus } from "../hooks/use-toggle-user-status";

type Props = {
  user: UserForm;
  onDropdownClose: () => void;
};

export function UserToggleStatusAlert({ user, onDropdownClose }: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { mutateAsync: toggleStatus, isPending } = useToggleUserStatus();

  const handleDeleteConfirm = async () => {
    await toggleStatus(user.id);
    setDeleteOpen(false);
    onDropdownClose();
  };

  const handleCancel = () => {
    setDeleteOpen(false);
    onDropdownClose();
  };

  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => e.preventDefault()}
        >
          <Power className="size-4" />
          {user.isActive ? "Desativar" : "Ativar"}
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {user.isActive ? "Desativar" : "Ativar"} usuário
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja {user.isActive ? "Desativar" : "ativar"} o
            usuário{" "}
            <span className="font-semibold text-foreground">{user.name}</span> ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={isPending}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm} disabled={isPending}>
            {isPending
              ? "Desativando..."
              : user.isActive
              ? "Desativar"
              : "Ativar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
