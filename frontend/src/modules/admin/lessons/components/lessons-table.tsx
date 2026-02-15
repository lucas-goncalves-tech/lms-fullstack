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
import { LessonActionsDropdown } from "./lesson-action-dropdown";
import { formatHoursMinutes } from "@/lib/utils/format-duration";
import { CreateLessonDialog } from "./lesson-create-dialog";
import { useGetLessonsTable } from "../hooks/use-get-lessons-table";
import { MobileCardSkeleton } from "../../shared/mobile-card-skeleton";
import { TableSkeleton } from "../../shared/table-skeleton";

type Props = {
  courseSlug: string;
};

export function LessonsTable({ courseSlug }: Props) {
  const { data: lessons, isLoading, isError } = useGetLessonsTable(courseSlug);

  if (isLoading) {
    return (
      <>
        <MobileCardSkeleton />
        <TableSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-destructive">Erro ao carregar aulas</div>
      </div>
    );
  }

  if (!lessons || lessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        <div className="text-muted-foreground">Nenhuma aula encontrada</div>
        <CreateLessonDialog courseSlug={courseSlug} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CreateLessonDialog courseSlug={courseSlug} />
      </div>

      {/* Mobile View - Cards */}
      <div className="block md:hidden space-y-3">
        {lessons.map((lesson) => (
          <Card key={lesson.slug}>
            <CardContent className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    #{lesson.order}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatHoursMinutes(lesson.seconds)}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mt-1 truncate">
                  {lesson.title}
                </h3>
                <p className="text-xs text-muted-foreground font-mono truncate">
                  {lesson.slug}
                </p>
              </div>
              <LessonActionsDropdown lesson={lesson} courseSlug={courseSlug} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">#</TableHead>
              <TableHead className="w-[150px]">Slug</TableHead>
              <TableHead>Título</TableHead>
              <TableHead className="w-[100px]">Duração</TableHead>
              <TableHead className="w-[80px] text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.slug}>
                <TableCell className="text-center font-semibold text-primary">
                  {lesson.order}
                </TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {lesson.slug}
                </TableCell>
                <TableCell className="font-medium">{lesson.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatHoursMinutes(lesson.seconds)}
                </TableCell>
                <TableCell className="text-center">
                  <LessonActionsDropdown
                    lesson={lesson}
                    courseSlug={courseSlug}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
