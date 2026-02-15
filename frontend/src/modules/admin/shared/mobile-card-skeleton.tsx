import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MobileCardSkeleton() {
  return (
    <div className="block md:hidden space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardContent className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0 max-w-1/2">
              <div className="text-xs text-muted-foreground font-mono truncate">
                <Skeleton className="h-6" />
              </div>
              <div className="font-semibold text-foreground mt-1 truncate">
                <Skeleton className="h-6" />
              </div>
              <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                <Skeleton className="h-6" />
              </div>
            </div>
            <div className="w-[80px]">
              <Skeleton className="h-6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
