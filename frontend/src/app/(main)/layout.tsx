import { AppHeader, AppSidebar } from "@/components/layout";
import { AuthInitializer } from "@/components/providers/auth-initializer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AuthInitializer>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="flex-1 p-6 md:p-5 flex justify-center">
            {children}
          </main>
        </SidebarInset>
      </AuthInitializer>
    </SidebarProvider>
  );
}
