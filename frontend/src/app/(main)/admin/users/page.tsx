import { PageHeader } from "@/components/ui/page-header";
import { UserTable } from "@/modules/admin/users/components/user-table";

export default function UsersPage() {
  return (
    <div className="w-full max-w-7xl">
      <PageHeader title="Usuários" subtitle="Administração de usuários" />
      <UserTable />
    </div>
  );
}
