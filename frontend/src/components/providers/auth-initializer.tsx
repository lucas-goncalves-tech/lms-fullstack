"use client";

import { useAuth } from "@/shared/context/auth";
import { PropsWithChildren } from "react";
import { GraduationCap } from "lucide-react";
import { useGetMe } from "@/modules/auth";

export function AuthInitializer({ children }: PropsWithChildren) {
  useGetMe();
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-background relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse delay-700" />
        </div>

        {/* Logo container with animation */}
        <div className="flex flex-col items-center gap-6">
          {/* Animated logo */}
          <div className="relative">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-primary/30 to-primary/10 backdrop-blur-sm border border-primary/20 animate-[bounce_2s_ease-in-out_infinite]">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse" />
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            LMS Platforma
          </h1>

          {/* Loading indicator with dots */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Carregando</span>
            <span className="flex gap-1">
              <span className="h-1 w-1 rounded-full bg-primary animate-[pulse_1s_ease-in-out_infinite]" />
              <span className="h-1 w-1 rounded-full bg-primary animate-[pulse_1s_ease-in-out_0.2s_infinite]" />
              <span className="h-1 w-1 rounded-full bg-primary animate-[pulse_1s_ease-in-out_0.4s_infinite]" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
