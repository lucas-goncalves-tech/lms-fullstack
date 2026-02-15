import { GraduationCap } from "lucide-react";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>

      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="bg-primary/20 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <GraduationCap size={36} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center">
        {children}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          © 2024 LMS Platform. Todos os direitos reservados.
        </p>
      </div>
    </main>
  );
}
