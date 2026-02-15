import { Skeleton } from "@/components/ui/skeleton";

export function LessonHeaderSkeleton() {
  return (
    <div className="mb-6 space-y-2 flex items-start justify-between gap-1">
      <div className="space-y-2 w-full">
        <Skeleton className="w-32 h-3" />
        <div className="flex items-center gap-2 justify-between w-full">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-20 h-5 rounded-md" />
        </div>
      </div>
    </div>
  );
}
