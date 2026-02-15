"use client";

import { MinimalistProgress } from "@/components/ui/minimalist-progress";
import { LessonHeaderSkeleton } from "./lesson-header-skeleton";
import { transformSlugToTitle } from "@/lib/utils/transform-slug-title";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetLessons } from "@/modules/course";
import { useGetUniqueLesson } from "../hooks/use-get-unique-lesson";

type Props = {
  courseSlug: string;
  lessonSlug: string;
};

export function LessonHeader({ courseSlug, lessonSlug }: Props) {
  const { data: lessons } = useGetLessons(courseSlug);
  const {
    data: lesson,
    isLoading,
    isError,
  } = useGetUniqueLesson(courseSlug, lessonSlug);
  const totalLessons = lessons?.length ?? 0;
  const completedLessons = lessons?.filter((l) => l.completed).length ?? 0;
  const progress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  if (isLoading) {
    return <LessonHeaderSkeleton />;
  }

  if (isError) {
    return <p className="text-center text-red-500">Erro ao carregar a aula</p>;
  }

  return (
    <div className="mb-6 space-y-2">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="gap-2 -ml-2">
        <Link href={`/course/${courseSlug}`}>
          <ArrowLeft className="size-4" />
          Voltar para {transformSlugToTitle(courseSlug)}
        </Link>
      </Button>

      {/* Header Content */}
      <div className="flex items-center justify-between flex-wrap sm:gap-4">
        <div>
          <h1 className="text-xl space-x-2 md:text-2xl font-bold text-center text-foreground tracking-tight">
            <span className="inline-block text-muted-foreground">
              {lesson?.order.toString().padStart(2, "0")}
            </span>
            <span className="inline-block">{lesson?.title}</span>
          </h1>
        </div>
        <MinimalistProgress progress={progress} />
      </div>
    </div>
  );
}
