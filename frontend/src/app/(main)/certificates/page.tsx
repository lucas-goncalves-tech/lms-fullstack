import { PageHeader } from "@/components/ui/page-header";
import { CertificatesList } from "@/modules/certificates";

export default function CertificatesPage() {
  return (
    <div className="w-full max-w-5xl">
      <PageHeader title="Certificados" />
      <CertificatesList />
    </div>
  );
}
