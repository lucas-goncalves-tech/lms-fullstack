"use client";

import { PageHeader } from "@/components/ui/page-header";
import { formatHoursMinutes } from "@/lib/utils/format-duration";
import { StatCard, useGetCourse } from "@/modules/course";
import { Clock, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  courseSlug: string;
};

export function AdminCourseHeader({ courseSlug }: Props) {
  const router = useRouter();
  const { data: course, isLoading } = useGetCourse(courseSlug);
  const totalLessons = course?.totalLessons ?? 0;
  const totalSeconds = course?.totalSeconds ?? 0;

  useEffect(() => {
    if (!isLoading && !course) {
      router.replace(`/admin/courses/`);
    }
  }, [course, isLoading, router]);

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
  ];

  return (
    <header className="mb-6 w-full">
      <PageHeader title={course?.title} />
      <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            isLoading={isLoading}
          />
        ))}
      </div>
    </header>
  );
}
