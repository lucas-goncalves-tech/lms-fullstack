import { Clock, Video, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { formatHoursMinutes } from "@/lib/utils/format-duration";
import { ProgressBar } from "@/components/ui/progress-bar";

interface CourseCardProps {
  slug: string;
  title: string;
  description: string;
  totalSeconds: number;
  totalLessons: number;
  completedLessons: number;
}

export function CourseCard({
  slug,
  title,
  description,
  totalSeconds,
  totalLessons,
  completedLessons,
}: CourseCardProps) {
  const progress = Math.round((completedLessons / totalLessons) * 100) || 0;

  return (
    <Link href={`/course/${slug}`}>
      <Card className="group transition-colors hover:bg-card/80">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              <CardDescription className="line-clamp-2 mt-1">
                {description}
              </CardDescription>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/50 group-hover:text-primary transition-colors" />
          </div>
        </CardHeader>

        <CardContent>
          {/* Metrics */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Video size={14} />
              {totalLessons} aulas
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {formatHoursMinutes(totalSeconds)}
            </span>
          </div>
        </CardContent>

        <CardFooter>
          <div className="w-full">
            <ProgressBar progress={progress} showNotStarted showCompleted />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
