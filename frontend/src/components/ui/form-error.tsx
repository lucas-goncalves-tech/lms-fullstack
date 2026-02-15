import { FieldError } from "react-hook-form";
import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  error?: FieldError;
}

export function FormError({ error }: FormErrorProps) {
  if (!error?.message) return null;

  return (
    <div className="flex items-center gap-1.5 mt-1.5 text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      <span className="text-xs font-medium">{error.message}</span>
    </div>
  );
}
