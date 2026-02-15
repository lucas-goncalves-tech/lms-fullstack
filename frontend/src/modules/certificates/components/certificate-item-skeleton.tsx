import { Skeleton } from "@/components/ui/skeleton";

export function CertificateItemSkeleton() {
  return (
    <div className="flex items-center justify-between w-full px-5 py-4">
      <Skeleton className="h-4 w-48" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}
