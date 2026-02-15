"use client";
import { useGetLessons } from "../hooks/use-get-lessons";
import { LessonItem } from "./lesson-item";
import { LessonItemSkeleton } from "./lesson-item-skeleton";

type Props = {
  courseSlug: string;
};

export function LessonsList({ courseSlug }: Props) {
  const { data: lessons, isLoading, error } = useGetLessons(courseSlug);

  if (error)
    return <p className="text-center text-red-500">Erro ao carregar lições</p>;

  if (isLoading)
    return (
      <div>
        <LessonItemSkeleton />
        <LessonItemSkeleton />
        <LessonItemSkeleton />
      </div>
    );

  return (
    <div className="rounded-sm bg-background/50 backdrop-blur-sm border border-border/40 overflow-hidden">
      {lessons?.map((lesson, index) => (
        <LessonItem
          key={lesson.id}
          courseSlug={courseSlug}
          slug={lesson.slug}
          title={lesson.title}
          seconds={lesson.seconds}
          order={lesson.order}
          completed={lesson.completed}
          isEven={index % 2 === 0}
        />
      ))}
    </div>
  );
}
