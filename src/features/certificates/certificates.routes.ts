import { DataBase } from "../../db";
import { validateMiddleware } from "../../shared/middlewares/validate.middleware";
import { CertificateRepository } from "./certificate.repository";
import { CertificatesController } from "./certificates.controller";
import { CertificatesService } from "./certificates.service";
import { Router } from "express";
import { certificateIdParamsDto } from "./dto/certificate-params.dto";

export class CertificatesRoutes {
  private readonly router = Router();
  private readonly controller: CertificatesController;

  constructor(private readonly db: DataBase) {
    const repository = new CertificateRepository(this.db);
    const service = new CertificatesService(repository);
    this.controller = new CertificatesController(service);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", this.controller.findManyCertificatesByUserId);
    this.router.get(
      "/:certificateId",
      validateMiddleware({ params: certificateIdParamsDto }),
      this.controller.findCertificateById
    );
  }

  get getRouter() {
    return this.router;
  }
}
