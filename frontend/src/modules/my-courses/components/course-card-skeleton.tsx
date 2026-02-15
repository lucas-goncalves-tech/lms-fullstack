import { Clock, Video, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CourseCardSkeleton() {
  return (
    <Card className="group transition-colors hover:bg-card/80">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/50 group-hover:text-primary transition-colors" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Video size={14} />
            <Skeleton className="h-4 w-16" />
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            <Skeleton className="h-4 w-16" />
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <div className="w-full space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-muted">
            <div
              className={`h-1.5 rounded-full transition-all `}
              style={{ width: "100%" }}
            />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </CardFooter>
    </Card>
  );
}
