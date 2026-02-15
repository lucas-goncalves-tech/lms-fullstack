"use client";
import { Video, Clock, TrendingUp } from "lucide-react";
import { formatHoursMinutes } from "@/lib/utils/format-duration";
import { ResetCourseAlert } from "./reset-course-alert";
import { PageHeader } from "@/components/ui/page-header";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatCard } from "./stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCourse } from "../hooks/use-get-course";
import { useGetLessons } from "../hooks/use-get-lessons";
import { useResetCourseProgress } from "../hooks/use-reset-course-progress";

type Props = {
  courseSlug: string;
};

export function CourseHeader({ courseSlug }: Props) {
  const { data: course } = useGetCourse(courseSlug);
  const { data: lessons, isLoading } = useGetLessons(courseSlug);
  const { mutate: resetProgress, isPending: isResetting } =
    useResetCourseProgress(courseSlug);

  const totalLessons = course?.totalLessons ?? 0;
  const completedLessons = lessons?.filter((l) => l.completed).length ?? 0;
  const totalSeconds = course?.totalSeconds ?? 0;
  const progress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const isCompleted = progress === 100;

  const stats = [
    {
      icon: Video,
      label: "Aulas",
      value: totalLessons,
      isHighlighted: false,
    },
    {
      icon: Clock,
      label: "Duração",
      value: formatHoursMinutes(totalSeconds),
      isHighlighted: false,
    },
    {
      icon: TrendingUp,
      label: "Progresso",
      value: `${progress}%`,
      isHighlighted: isCompleted,
    },
  ];

  return (
    <header className="w-full mb-8">
      {/* Title */}
      <PageHeader title={course?.title} />

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto mb-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            isLoading={isLoading}
            isHighlighted={stat.isHighlighted}
          />
        ))}
      </div>

      <div className="max-w-md mx-auto space-y-2">
        <div className="text-center w-full">
          {isLoading ? (
            <Skeleton className="h-3 w-full" />
          ) : (
            <ProgressBar progress={progress} showNotStarted showCompleted />
          )}
        </div>

        {/* Reset Button - Only visible when course is 100% complete */}
        {isCompleted && !isLoading && (
          <div className="flex justify-center mt-4">
            <ResetCourseAlert
              handleReset={resetProgress}
              isResetting={isResetting}
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default CourseHeader;
