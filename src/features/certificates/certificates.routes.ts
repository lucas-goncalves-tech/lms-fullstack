import { DataBase } from "../../db";
import { CertificateRepository } from "./certificate.repository";
import { CertificatesController } from "./certificates.controller";
import { CertificatesService } from "./certificates.service";
import { Router } from "express";

export class CertificatesRoutes {
  private readonly router = Router();
  private readonly controller: CertificatesController;

  constructor(private readonly db: DataBase) {
    const repository = new CertificateRepository(db);
    const service = new CertificatesService(repository);
    this.controller = new CertificatesController(service);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", this.controller.findManyCertificatesByUserId);
  }

  get getRouter() {
    return this.router;
  }
}
