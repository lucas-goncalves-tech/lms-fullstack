import { ForbiddenError } from "../../shared/errors/forbidden.error";
import { NotfoundError } from "../../shared/errors/not-found.error";
import { CertificateRepository } from "./certificate.repository";

export class CertificatesService {
  constructor(private readonly certificateRepository: CertificateRepository) {}

  async findManyCertificatesByUserId(userId: string) {
    const result = await this.certificateRepository.findManyCertificatesByUserId(userId);
    return result.map(({ userId: _, totalSeconds, ...certificate }) => ({
      ...certificate,
      totalSeconds: (totalSeconds ?? 0) * 2,
    }));
  }

  async findCertificateById(userId: string, certificateId: string) {
    const result = await this.certificateRepository.findCertificateById(certificateId);
    if (!result) {
      throw new NotfoundError("Certificado nao encontrado");
    }
    if (result.userId !== userId) {
      throw new ForbiddenError();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId: _, totalSeconds, ...certificate } = result;
    return {
      ...certificate,
      totalSeconds: (totalSeconds ?? 0) * 2,
    };
  }
}
