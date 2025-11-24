import { CertificateRepository } from "./certificate.repository";

export class CertificatesService {
  constructor(private readonly certificateRepository: CertificateRepository) {}

  async findManyCertificatesByUserId(userId: string) {
    return this.certificateRepository.findManyCertificatesByUserId(userId);
  }
}
