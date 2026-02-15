import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  isLoading?: boolean;
  isHighlighted?: boolean;
};

export function StatCard({
  icon: Icon,
  label,
  value,
  isLoading = false,
  isHighlighted = false,
}: StatCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center gap-1">
      <Icon
        className={`size-4 md:size-5 ${
          isHighlighted ? "text-emerald-500" : "text-primary"
        }`}
      />
      <span className="text-xs text-muted-foreground">{label}</span>
      {isLoading ? (
        <Skeleton className="w-10 h-5" />
      ) : (
        <span
          className={`text-lg md:text-xl font-semibold ${
            isHighlighted ? "text-emerald-500" : "text-foreground"
          }`}
        >
          {value}
        </span>
      )}
    </Card>
  );
}
