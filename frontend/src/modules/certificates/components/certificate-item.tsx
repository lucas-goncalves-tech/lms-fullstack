import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatHoursMinutes } from "@/lib/utils/format-duration";

interface CertificateItemProps {
  id: string;
  title: string;
  totalSeconds: number;
  completed: string;
  isEven: boolean;
}

export function CertificateItem({
  id,
  title,
  totalSeconds,
  completed,
  isEven,
}: CertificateItemProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const formattedDate = new Date(completed).toLocaleDateString("pt-BR");

  return (
    <Link
      href={`${BASE_URL}/certificates/${id}`}
      className={cn(
        "group flex items-center justify-between w-full px-5 py-4 transition-colors",
        isEven ? "bg-muted/30" : "bg-transparent",
        "hover:bg-accent/50"
      )}
    >
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
        {title}
      </span>

      <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5" />
          {formatHoursMinutes(totalSeconds)}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="size-3.5" />
          {formattedDate}
        </span>
      </div>
    </Link>
  );
}
