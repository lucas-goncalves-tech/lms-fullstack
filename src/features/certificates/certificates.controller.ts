import { CertificatesService } from "./certificates.service";
import { Request, Response } from "express";

export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  findManyCertificatesByUserId = async (req: Request, res: Response) => {
    const userId = req.session!.userId;
    const certificates = await this.certificatesService.findManyCertificatesByUserId(userId);
    res.json(certificates);
  };

  findCertificateById = async (req: Request, res: Response) => {
    const certificateId = req.params.certificateId;
    const userId = req.session!.userId;
    const certificate = await this.certificatesService.findCertificateById(userId, certificateId);
    res.json(certificate);
  };
}
