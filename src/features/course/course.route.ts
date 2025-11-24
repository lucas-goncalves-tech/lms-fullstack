import { Router } from "express";
import { DataBase } from "../../db";
import { CourseController } from "./course.controller";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./course.service";
import { validateMiddleware } from "../../shared/middlewares/validate.middleware";
import { createCourseSchema } from "./dto/create-course.dto";
import { ValidateSessionMiddleware } from "../../shared/middlewares/validate-session.middleware";
import { SessionsService } from "../sessions/sessions.service";
import { SessionsRepository } from "../sessions/sessions.repository";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { UserRepository } from "../user/user.repository";
import { GuardRoleMiddleware } from "../../shared/middlewares/guard-role.middleware";

export class CourseRoutes {
  private readonly controller: CourseController;
  private readonly router: Router;
  private readonly validateSessionMiddleware: ValidateSessionMiddleware;
  private readonly guardRoleMiddleware: GuardRoleMiddleware;

  constructor(private readonly db: DataBase) {
    const repository = new CourseRepository(this.db);
    const sessionsRepository = new SessionsRepository(this.db);
    const userRepository = new UserRepository(this.db);
    const cryptoService = new CryptoService();
    const sessionsService = new SessionsService(sessionsRepository, userRepository, cryptoService);
    const service = new CourseService(repository);
    this.validateSessionMiddleware = new ValidateSessionMiddleware(sessionsService);
    this.guardRoleMiddleware = new GuardRoleMiddleware();
    this.controller = new CourseController(service);
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.use(this.validateSessionMiddleware.validateSession);
    this.router.post(
      "/",
      validateMiddleware({ body: createCourseSchema }),
      this.guardRoleMiddleware.adminGuard,
      this.controller.createCourse
    );
    this.router.get("/", this.controller.findAll);
    this.router.get("/:courseSlug", this.controller.findBySlug);
  }

  get getRouter() {
    return this.router;
  }
}
