import { DataBase } from "../../db";
import { LessonRepository } from "./lesson.repository";
import { LessonService } from "./lesson.service";
import { LessonController } from "./lesson.controller";
import { CourseRepository } from "../course/course.repository";
import { Router } from "express";
import { validateMiddleware } from "../../shared/middlewares/validate.middleware";
import { createLessonSchema } from "./dto/create-lesson.dto";
import { createLessonParamsSchema, findLessonParamsSchema } from "./dto/lesson-params.dto";

export class LessonRoutes {
  private readonly controller: LessonController;
  private readonly router: Router;

  constructor(private readonly db: DataBase) {
    const repository = new LessonRepository(this.db);
    const courseRepository = new CourseRepository(this.db);
    const service = new LessonService(repository, courseRepository);
    this.controller = new LessonController(service);
    this.router = Router({ mergeParams: true });
    this.initRoutes();
  }

  private initRoutes() {
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
      this.controller.createLesson
    );
  }

  getRouter() {
    return this.router;
  }
}
