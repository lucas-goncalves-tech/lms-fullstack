"use client";

import * as React from "react";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, icon, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";
    const IconComponent = icon;
    const hasLeftIcon = IconComponent;

    const togglePasswordVisibility = React.useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block pb-2 text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            "group flex h-12 w-full items-center gap-3 overflow-hidden rounded-sm border border-input bg-background/50 px-4 text-base text-foreground transition-all duration-200",
            "hover:border-primary/50 hover:bg-background/70",
            "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/50",
            className
          )}
        >
          {hasLeftIcon && IconComponent && (
            <div className="pointer-events-none text-muted-foreground transition-colors group-hover:text-primary">
              <IconComponent size={20} />
            </div>
          )}
          <input
            id={id}
            type={isPassword && showPassword ? "text" : type}
            ref={ref}
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, type InputProps };
