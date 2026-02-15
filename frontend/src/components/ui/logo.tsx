import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className, size = 24, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
        <GraduationCap size={size} />
      </div>
      {showText && (
        <span className="text-lg font-bold text-foreground">LMS</span>
      )}
    </div>
  );
}
