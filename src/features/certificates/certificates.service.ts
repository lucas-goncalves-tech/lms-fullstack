import { NotfoundError } from "../../shared/errors/not-found.error";
import { CertificateRepository } from "./certificate.repository";

export class CertificatesService {
  constructor(private readonly certificateRepository: CertificateRepository) {}

  async findManyCertificatesByUserId(userId: string) {
    return this.certificateRepository.findManyCertificatesByUserId(userId);
  }

  async findCertificateById(certificateId: string) {
    const result = await this.certificateRepository.findCertificateById(certificateId);
    if (!result) {
      throw new NotfoundError("Certificado nao encontrado");
    }
    return result;
  }
}
