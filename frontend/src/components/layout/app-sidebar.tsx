"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Shield } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { SidebarSkeleton } from "./sidebar-loading";
import { useAuth } from "@/shared/context/auth";
import { useLogout } from "@/modules/auth";
import { adminNavItems, navItems } from "@/lib/constants/nav-items";

export function AppSidebar() {
  const pathname = usePathname();
  const { user, setIsLoading } = useAuth();
  const { mutate: logout } = useLogout();
  const { setOpenMobile } = useSidebar();

  if (!user) return <SidebarSkeleton />;

  function handleLogout() {
    setIsLoading(true);
    setOpenMobile(false);
    logout();
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-sm font-medium text-sidebar-foreground truncate">
            {user.name}
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {user.email}
          </span>
             {user.role === "ADMIN" && (
               <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-linear-to-r from-primary/20 to-primary/10 border border-primary/30 w-fit">
                 <Shield className="size-2.5 text-primary" />
                 <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                   Admin
                 </span>
               </div>
             )}
           </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    onClick={() => setOpenMobile(false)}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {user.role === "ADMIN" && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.title}
                      onClick={() => setOpenMobile(false)}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sair">
              <Button className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
