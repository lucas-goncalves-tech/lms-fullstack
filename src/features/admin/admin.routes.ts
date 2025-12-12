import { Router } from "express";
import { DataBase } from "../../db";
import { validateMiddleware } from "../../shared/middlewares/validate.middleware";
import { adminGuardMiddleware } from "../../shared/middlewares/guard-role.middleware";
import { createCourseSchema } from "./dto/create-course.dto";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { CourseRepository } from "../course/course.repository";
import { LessonParamsSchema } from "../lessons/dto/lesson-params.dto";
import { createLessonSchema } from "./dto/create-lesson.dto";
import { LessonRepository } from "../lessons/lesson.repository";

export class AdminRoutes {
  private readonly controller: AdminController;
  private readonly router: Router;

  constructor(private readonly db: DataBase) {
    const repository = new CourseRepository(this.db);
    const lessonRepository = new LessonRepository(this.db);
    const service = new AdminService(repository, lessonRepository);
    this.controller = new AdminController(service);
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.use(adminGuardMiddleware);
    this.router.post(
      "/courses/new",
      validateMiddleware({ body: createCourseSchema }),
      this.controller.createCourse
    );
    this.router.post(
      "/lessons/:courseSlug/new",
      validateMiddleware({ params: LessonParamsSchema, body: createLessonSchema }),
      this.controller.createLesson
    );
  }

  get getRouter() {
    return this.router;
  }
}
