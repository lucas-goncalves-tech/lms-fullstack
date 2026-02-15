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
import { Trash } from "lucide-react";
import { useState } from "react";
import { UserForm } from "./user-table";
import { useDeleteUser } from "../hooks/use-delete-user";

type Props = {
  user: UserForm;
  onDropdownClose: () => void;
};

export function UserDeleteAlert({ user, onDropdownClose }: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { mutateAsync: deleteUser, isPending } = useDeleteUser();

  const handleDeleteConfirm = async () => {
    await deleteUser(user.id);
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
          <Trash className="size-4" />
          Deletar
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deletar usuário</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja deletar o usuário{" "}
            <span className="font-semibold text-foreground">{user.name}</span> ?
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={isPending}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm} disabled={isPending}>
            {isPending ? "Deletando..." : "Deletar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
