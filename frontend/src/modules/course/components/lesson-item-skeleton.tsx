import { Skeleton } from "@/components/ui/skeleton";

export function LessonItemSkeleton() {
  return (
    <div className="flex items-center justify-between w-full px-5 py-4 bg-muted/30">
      {/* Left group: check, order, title */}
      <div className="flex items-center gap-4">
        <Skeleton className="size-5 rounded-full" />
        <Skeleton className="w-6 h-4" />
        <Skeleton className="w-48 h-4" />
      </div>

      {/* Right group: duration */}
      <div className="flex items-center gap-1.5">
        <Skeleton className="size-3.5 rounded-full" />
        <Skeleton className="w-10 h-3" />
      </div>
    </div>
  );
}
