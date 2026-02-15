"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetUniqueLesson } from "../hooks/use-get-unique-lesson";
import { useCompleteLesson } from "../hooks/use-complete-lesson";

type Props = {
  courseSlug: string;
  lessonSlug: string;
};

export function LessonPlayer({ courseSlug, lessonSlug }: Props) {
  const router = useRouter();
  const {
    data: lesson,
    isLoading,
    isError,
  } = useGetUniqueLesson(courseSlug, lessonSlug);
  const { mutateAsync: completeLesson, isPending } = useCompleteLesson(
    courseSlug,
    lessonSlug
  );

  const api_url = process.env.NEXT_PUBLIC_API_URL || "";

  const handleEndVideo = async () => {
    if (!lesson?.completed) {
      await completeLesson();
    }
    if (lesson?.nextLesson && !lesson?.completed) {
      router.push(`/course/${courseSlug}/${lesson.nextLesson}`);
    }
  };

  if (isError) return null;
  return (
    <div className="space-y-6">
      {isLoading ? (
        <Skeleton className="aspect-video rounded-xs"></Skeleton>
      ) : (
        <>
          <video
            src={`${api_url}${lesson?.videoUrl}`}
            controls
            className="aspect-video bg-zinc-800 rounded-xs"
            onEnded={handleEndVideo}
          >
            Player não disponivel
          </video>
          <div className="flex items-center gap-2 justify-between">
            {/* Anterior */}
            {lesson?.prevLesson ? (
              <Button
                variant="outline"
                asChild
                className="group relative overflow-visible"
              >
                <Link href={`/course/${courseSlug}/${lesson.prevLesson}`}>
                  <ChevronLeft size={16} />
                  Anterior
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded bg-muted text-xs text-muted-foreground opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
                    {lesson.prevLesson}
                  </span>
                </Link>
              </Button>
            ) : (
              <Button
                variant="outline"
                className="opacity-0 pointer-events-none"
              >
                <ChevronLeft size={16} />
                Anterior
              </Button>
            )}

            {/* Completar */}
            {lesson?.completed ? (
              <Button
                variant="outline"
                className="opacity-0 pointer-events-none"
              >
                Completar
              </Button>
            ) : (
              <Button
                variant="outline"
                disabled={isPending}
                onClick={() => completeLesson()}
              >
                Completar
              </Button>
            )}

            {/* Próximo */}
            {lesson?.nextLesson ? (
              <Button
                variant="outline"
                asChild
                className="group relative overflow-visible"
              >
                <Link href={`/course/${courseSlug}/${lesson.nextLesson}`}>
                  Próxima
                  <ChevronRight size={16} />
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded bg-muted text-xs text-muted-foreground opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
                    {lesson.nextLesson}
                  </span>
                </Link>
              </Button>
            ) : (
              <Button
                variant="outline"
                className="opacity-0 pointer-events-none"
              >
                Próxima
                <ChevronRight size={16} />
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
