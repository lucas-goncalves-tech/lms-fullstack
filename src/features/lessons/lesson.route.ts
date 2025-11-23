import { DataBase } from "../../db";
import { LessonRepository } from "./lesson.repository";
import { LessonService } from "./lesson.service";
import { LessonController } from "./lesson.controller";
import { CourseRepository } from "../course/course.repository";
import { Router } from "express";
import { validateMiddleware } from "../../shared/middlewares/validate.middleware";
import { createLessonSchema } from "./dto/create-lesson.dto";
import { createLessonParamsSchema, findLessonParamsSchema } from "./dto/lesson-params.dto";
import { SessionsRepository } from "../sessions/sessions.repository";
import { UserRepository } from "../user/user.repository";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { SessionsService } from "../sessions/sessions.service";
import { ValidateSessionMiddleware } from "../../shared/middlewares/validate-session.middleware";
import { GuardRoleMiddleware } from "../../shared/middlewares/guard-role.middleware";

export class LessonRoutes {
  private readonly controller: LessonController;
  private readonly router: Router;
  private readonly validateSessionMiddleware: ValidateSessionMiddleware;
  private readonly guardRoleMiddleware: GuardRoleMiddleware;

  constructor(private readonly db: DataBase) {
    const repository = new LessonRepository(this.db);
    const courseRepository = new CourseRepository(this.db);
    const sessionsRepository = new SessionsRepository(this.db);
    const userRepository = new UserRepository(this.db);
    const cryptoService = new CryptoService();
    const sessionsService = new SessionsService(sessionsRepository, userRepository, cryptoService);
    const service = new LessonService(repository, courseRepository);
    this.validateSessionMiddleware = new ValidateSessionMiddleware(sessionsService);
    this.guardRoleMiddleware = new GuardRoleMiddleware();
    this.controller = new LessonController(service);
    this.router = Router({ mergeParams: true });
    this.initRoutes();
  }

  private initRoutes() {
    this.router.use(this.validateSessionMiddleware.validateSession);
    this.router.get(
      "/",
      validateMiddleware({ params: createLessonParamsSchema }),
      this.controller.findManyByCourseSlug
    );

    // fazer complete lesson após auth middleware

    this.router.get(
      "/:lessonSlug",
      validateMiddleware({ params: findLessonParamsSchema }),
      this.controller.findBySlug
    );
    this.router.post(
      "/",
      validateMiddleware({ params: createLessonParamsSchema, body: createLessonSchema }),
      this.guardRoleMiddleware.guard(["ADMIN"]),
      this.controller.createLesson
    );
  }

  get getRouter() {
    return this.router;
  }
}
