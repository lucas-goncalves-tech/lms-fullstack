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

export class AuthRoutes {
  private readonly controller: AuthController;
  private readonly router: Router;

  constructor(private readonly db: DataBase) {
    const sessionsRepository = new SessionsRepository(this.db);
    const userRepository = new UserRepository(this.db);
    const cryptoService = new CryptoService();
    const sessionsService = new SessionsService(sessionsRepository, userRepository, cryptoService);
    const authService = new AuthService(userRepository);
    this.controller = new AuthController(authService, sessionsService);
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      "/register",
      validateMiddleware({ body: createUserSchema }),
      this.controller.createUser
    );
    this.router.post("/", validateMiddleware({ body: loginUserSchema }), this.controller.loginUser);
  }

  get getRouter() {
    return this.router;
  }
}
