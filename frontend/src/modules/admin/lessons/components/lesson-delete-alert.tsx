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
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { LessonTable } from "../schemas/lessons-table";
import { useDeleteLesson } from "../hooks/use-delete-lesson";

type Props = {
  lesson: LessonTable;
  courseSlug: string;
  onDropdownClose: () => void;
};

export function LessonDeleteAlert({
  lesson,
  courseSlug,
  onDropdownClose,
}: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { mutateAsync: deleteLesson, isPending } = useDeleteLesson(courseSlug);

  const handleDeleteConfirm = async () => {
    await deleteLesson(lesson.slug);
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
          <Trash2 className="size-4" />
          Excluir
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir aula</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a aula{" "}
            <span className="font-semibold text-foreground">
              {lesson.title}
            </span>
            ? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={isPending}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm} disabled={isPending}>
            {isPending ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
