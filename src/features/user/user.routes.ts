import { Router } from "express";
import { UserController } from "./user.controller";
import { DataBase } from "../../db";
import { SessionsRepository } from "../sessions/sessions.repository";
import { UserRepository } from "./user.repository";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { SessionsService } from "../sessions/sessions.service";
import { UserService } from "./user.service";
import { UploadService } from "../upload/upload.service";
import { noCacheMiddleware } from "../../shared/middlewares/no-cache.middleware";
import { validateMiddleware } from "../../shared/middlewares/validate.middleware";
import { updatePasswordSchema } from "./dto/update-password.dto";
import { rateLimitMiddleware } from "../../shared/middlewares/rate-limit.middleware";

export class UserRoutes {
  private readonly controller: UserController;
  private readonly router: Router;
  private readonly ttl: number;

  constructor(private readonly db: DataBase) {
    const uploadService = new UploadService();
    const userRepository = new UserRepository(this.db);
    const cryptoService = new CryptoService();
    const sessionsRepository = new SessionsRepository(this.db);
    const sessionsService = new SessionsService(sessionsRepository, userRepository, cryptoService);
    const service = new UserService(userRepository, cryptoService, uploadService);
    this.controller = new UserController(service, sessionsService);
    this.router = Router();
    this.initRoutes();
    this.ttl = 10 * 60 * 1000;
  }

  private initRoutes() {
    this.router.use(rateLimitMiddleware(this.ttl, 10));
    this.router.use(noCacheMiddleware);
    this.router.put(
      "/password/update",
      validateMiddleware({ body: updatePasswordSchema }),
      this.controller.updatePassword
    );
  }

  get getRouter() {
    return this.router;
  }
}
