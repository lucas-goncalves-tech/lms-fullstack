import { DataBase } from "../../db";
import { LessonRepository } from "./lesson.repository";
import { LessonService } from "./lesson.service";
import { LessonController } from "./lesson.controller";
import { CourseRepository } from "../course/course.repository";
import { CertificateRepository } from "../certificates/certificate.repository";
import { Router } from "express";
import { validateMiddleware } from "../../shared/middlewares/validate.middleware";
import { findLessonParamsSchema } from "./dto/lesson-params.dto";
import { completeLessonParamsSchema } from "./dto/complete-lesson.dto";
import { courseSlugParamsSchema } from "../course/dto/course-params";
import { UploadService } from "../upload/upload.service";

export class LessonRoutes {
  private readonly controller: LessonController;
  private readonly router: Router;

  constructor(private readonly db: DataBase) {
    const repository = new LessonRepository(this.db);
    const courseRepository = new CourseRepository(this.db);
    const certificateRepository = new CertificateRepository(this.db);
    const uploadService = new UploadService();
    const service = new LessonService(repository, courseRepository, certificateRepository);
    this.controller = new LessonController(service, uploadService);
    this.router = Router({ mergeParams: true });
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      "/",
      validateMiddleware({ params: courseSlugParamsSchema }),
      this.controller.findManyByCourseSlug
    );

    this.router.get(
      "/:lessonSlug/complete",
      validateMiddleware({ params: completeLessonParamsSchema }),
      this.controller.completeLesson
    );

    this.router.get(
      "/:lessonSlug",
      validateMiddleware({ params: findLessonParamsSchema }),
      this.controller.findBySlug
    );

    this.router.get(
      "/:lessonSlug/video",
      validateMiddleware({ params: findLessonParamsSchema }),
      this.controller.videoStreaming
    );
    this.router.delete(
      "/reset",
      validateMiddleware({ params: courseSlugParamsSchema }),
      this.controller.resetCourseCompleted
    );
  }

  get getRouter() {
    return this.router;
  }
}
