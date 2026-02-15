"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Book, MoreHorizontal } from "lucide-react";
import { CourseForm } from "../schemas/course-form";
import { CourseFormDialog } from "./course-form-dialog";
import { CourseDeleteAlert } from "./course-delete-alert";

type Props = {
  course: CourseForm;
};

export function CourseActionsDropdown({ course }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Ações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <CourseFormDialog
          course={course}
          onDropdownClose={() => setOpen(false)}
        />
        <Link href={`/admin/courses/${course.slug}`}>
          <DropdownMenuItem>
            <Book className="size-4" />
            Ver aulas
          </DropdownMenuItem>
        </Link>
        <CourseDeleteAlert
          course={course}
          onDropdownClose={() => setOpen(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
