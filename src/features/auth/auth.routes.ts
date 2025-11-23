import { DataBase } from "../../db";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserRepository } from "../user/user.repository";
import { Router } from "express";
import { validateMiddleware } from "../../shared/middlewares/validate.middleware";
import { createUserSchema } from "./dto/create-user.dto";
import { loginUserSchema } from "./dto/login-user.dto";

export class AuthRoutes {
  private readonly controller: AuthController;
  private readonly router: Router;

  constructor(private readonly db: DataBase) {
    const authService = new AuthService(new UserRepository(this.db));
    this.controller = new AuthController(authService);
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
