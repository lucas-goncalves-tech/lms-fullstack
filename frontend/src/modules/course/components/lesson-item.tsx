import Link from "next/link";
import { Circle, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatMinutesSeconds } from "@/lib/utils/format-duration";

interface LessonItemProps {
  courseSlug: string;
  slug: string;
  title: string;
  seconds: number;
  order: number;
  completed: string | null;
  isEven: boolean;
}

export function LessonItem({
  courseSlug,
  slug,
  title,
  seconds,
  order,
  completed,
  isEven,
}: LessonItemProps) {
  const isCompleted = completed !== null;

  return (
    <Link
      href={`/course/${courseSlug}/${slug}`}
      className={cn(
        "group flex items-center justify-between w-full px-5 py-4 transition-colors",
        isEven ? "bg-muted/30" : "bg-transparent",
        isCompleted && "bg-emerald-500/5",
        "hover:bg-accent/50"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          {isCompleted ? (
            <CheckCircle2 className="size-5 text-emerald-500" />
          ) : (
            <Circle className="size-5 text-muted-foreground/40" />
          )}
        </div>

        <span className="flex flex-col text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          <span className="inline-block shrink-0 w-6 text-xs font-medium text-muted-foreground">
            {order.toString().padStart(2, "0")}
          </span>
          <span className="inline-block">{title}</span>
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
        <Clock className="size-3.5" />
        <span>{formatMinutesSeconds(seconds)}</span>
      </div>
    </Link>
  );
}
