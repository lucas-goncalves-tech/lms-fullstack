import { Logo } from "@/components/ui/logo";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border/50 bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex items-center gap-4 w-10">
        <SidebarTrigger className=" text-white" size="lg" />
      </div>
      <Logo className="absolute left-1/2 -translate-x-1/2" />
      <div className="w-10" />
    </header>
  );
}
