"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
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
import { CourseForm } from "../schemas/course-form";
import { useDeleteCourse } from "../hooks/use-delete-course";

type Props = {
  course: CourseForm;
  onDropdownClose: () => void;
};

export function CourseDeleteAlert({ course, onDropdownClose }: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { mutate: deleteCourse, isPending } = useDeleteCourse();

  const handleDeleteConfirm = async () => {
    deleteCourse(course.slug, {
      onSuccess: () => {
        setDeleteOpen(false);
        onDropdownClose();
      },
    });
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
          <AlertDialogTitle>Excluir curso</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o curso{" "}
            <span className="font-semibold text-foreground">
              {course.title}
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
