import { Router } from "express";
import { DataBase } from "../../db";
import { CourseController } from "./course.controller";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./course.service";
import { validateMiddleware } from "../../shared/middlewares/validate.middleware";
import { createCourseSchema } from "./dto/create-course.dto";
import { GuardRoleMiddleware } from "../../shared/middlewares/guard-role.middleware";
import { LessonRepository } from "../lessons/lesson.repository";

export class CourseRoutes {
  private readonly controller: CourseController;
  private readonly router: Router;
  private readonly guardRoleMiddleware: GuardRoleMiddleware;

  constructor(private readonly db: DataBase) {
    const repository = new CourseRepository(this.db);
    const lessonRepository = new LessonRepository(this.db);
    const service = new CourseService(repository, lessonRepository);
    this.guardRoleMiddleware = new GuardRoleMiddleware();
    this.controller = new CourseController(service);
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
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
