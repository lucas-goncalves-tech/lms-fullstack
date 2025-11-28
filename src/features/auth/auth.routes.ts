import { DataBase } from "../../db";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserRepository } from "../user/user.repository";
import { Router } from "express";
import { validateMiddleware } from "../../shared/middlewares/validate.middleware";
import { createUserSchema } from "./dto/create-user.dto";
import { loginUserSchema } from "./dto/login-user.dto";
import { SessionsRepository } from "../sessions/sessions.repository";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { SessionsService } from "../sessions/sessions.service";
import { ValidateSessionMiddleware } from "../../shared/middlewares/validate-session.middleware";
import { noCacheMiddleware } from "../../shared/middlewares/no-cache.middleware";
import { updatePasswordSchema } from "./dto/update-password.dto";
import { rateLimitMiddleware } from "../../shared/middlewares/rate-limit.middleware";

export class AuthRoutes {
  private readonly controller: AuthController;
  private readonly router: Router;
  private readonly validateSessionMiddleware: ValidateSessionMiddleware;
  private readonly ttl: number;

  constructor(private readonly db: DataBase) {
    const sessionsRepository = new SessionsRepository(this.db);
    const userRepository = new UserRepository(this.db);
    const cryptoService = new CryptoService();
    const sessionsService = new SessionsService(sessionsRepository, userRepository, cryptoService);
    const authService = new AuthService(userRepository);
    this.validateSessionMiddleware = new ValidateSessionMiddleware(sessionsService);
    this.controller = new AuthController(authService, sessionsService);
    this.router = Router();
    this.initRoutes();
    this.ttl = 5 * 60 * 1000;
  }

  private initRoutes() {
    this.router.put(
      "/password/update",
      noCacheMiddleware,
      this.validateSessionMiddleware.validateSession,
      validateMiddleware({ body: updatePasswordSchema }),
      this.controller.updatePassword
    );
    this.router.delete(
      "/logout",
      noCacheMiddleware,
      this.validateSessionMiddleware.validateSession,
      this.controller.logoutUser
    );
    this.router.get(
      "/me",
      noCacheMiddleware,
      this.validateSessionMiddleware.validateSession,
      this.controller.me
    );
    this.router.post(
      "/register",
      rateLimitMiddleware(this.ttl, 10),
      validateMiddleware({ body: createUserSchema }),
      this.controller.createUser
    );
    this.router.post(
      "/",
      rateLimitMiddleware(this.ttl, 3),
      noCacheMiddleware,
      validateMiddleware({ body: loginUserSchema }),
      this.controller.loginUser
    );
  }

  get getRouter() {
    return this.router;
  }
}
