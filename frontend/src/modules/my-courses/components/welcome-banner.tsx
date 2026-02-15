"use client";

import { useAuth } from "@/shared/context/auth";
import { PageHeader } from "@/components/ui/page-header";

export function WelcomeBanner() {
  const { user } = useAuth();
  const subtitle = `Bem-vinda de volta, ${user?.name}!`;
  return <PageHeader title="Meus Cursos" subtitle={subtitle} />;
}
