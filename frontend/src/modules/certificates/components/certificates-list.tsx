"use client";

import { useGetCertificates } from "../hooks/use-get-certificates";
import { CertificateItem } from "./certificate-item";
import { CertificateItemSkeleton } from "./certificate-item-skeleton";

export function CertificatesList() {
  const { data: certificates, isLoading, error } = useGetCertificates();

  if (error)
    return (
      <p className="text-center text-red-500">Erro ao carregar certificados</p>
    );

  if (isLoading)
    return (
      <div className="rounded-sm bg-background/50 backdrop-blur-sm border border-border/40 overflow-hidden">
        <CertificateItemSkeleton />
        <CertificateItemSkeleton />
        <CertificateItemSkeleton />
      </div>
    );

  if (!certificates || certificates.length === 0)
    return (
      <p className="text-center text-muted-foreground">
        Nenhum certificado encontrado.
      </p>
    );

  return (
    <div className="rounded-sm bg-background/50 backdrop-blur-sm border border-border/40 overflow-hidden">
      {certificates.map((certificate, index) => (
        <CertificateItem
          key={certificate.id}
          id={certificate.id}
          title={certificate.title}
          totalSeconds={certificate.totalSeconds}
          completed={certificate.completed}
          isEven={index % 2 === 0}
        />
      ))}
    </div>
  );
}
