import { UpdateAvatarForm } from "@/modules/profile/components/update-avatar-form";
import { UpdateEmailForm } from "@/modules/profile/components/update-email-form";
import { UpdatePasswordForm } from "@/modules/profile/components/update-password-form";
import { PageHeader } from "@/components/ui/page-header";

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-2xl w-full">
      <PageHeader title="Perfil" subtitle="Gerencie seu perfil" />

      <UpdateAvatarForm />
      <UpdateEmailForm />
      <UpdatePasswordForm />
    </div>
  );
}
