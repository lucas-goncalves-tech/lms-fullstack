import { Router } from "express";
import { DataBase } from "../../db";
import { validateMiddleware } from "../../shared/middlewares/validate.middleware";
import { adminGuardMiddleware } from "../../shared/middlewares/guard-role.middleware";
import { createCourseSchema } from "./dto/create-course.dto";
import { updateCourseSchema } from "./dto/update-course.dto";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { CourseRepository } from "../course/course.repository";
import { createLessonSchema } from "./dto/create-lesson.dto";
import { LessonRepository } from "../lessons/lesson.repository";
import { courseSlugParamsSchema } from "../course/dto/course-params";
import { UserRepository } from "../user/user.repository";
import { userIdParamsSchema } from "./dto/admin-params";
import { updateUserSchema } from "./dto/update-user.dto";
import { adminCreateUserSchema } from "./dto/admin-create-user.dto";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { noCacheMiddleware } from "../../shared/middlewares/no-cache.middleware";
import { lessonSlugParamsSchema } from "../course/dto/lesson-params";
import { validateFileHeadersMiddleware } from "../../shared/middlewares/validate-file-headers.middleware";
import { VideoService } from "../video/video.service";

export class AdminRoutes {
  private readonly controller: AdminController;
  private readonly router: Router;

  constructor(private readonly db: DataBase) {
    const cryptoService = new CryptoService();
    const repository = new CourseRepository(this.db);
    const lessonRepository = new LessonRepository(this.db);
    const userRepository = new UserRepository(this.db);
    const videoService = new VideoService();
    const service = new AdminService(repository, lessonRepository, userRepository, cryptoService);
    this.controller = new AdminController(service, videoService);
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.use(adminGuardMiddleware);
    this.router.use(noCacheMiddleware);

    // Courses
    this.router.get("/courses", this.controller.findManyCourses);
    this.router.post(
      "/courses/new",
      validateMiddleware({ body: createCourseSchema }),
      this.controller.createCourse
    );
    this.router.put(
      "/courses/:courseSlug/update",
      validateMiddleware({ params: courseSlugParamsSchema, body: updateCourseSchema }),
      this.controller.updateCourse
    );
    this.router.delete(
      "/courses/:courseSlug/delete",
      validateMiddleware({ params: courseSlugParamsSchema }),
      this.controller.deleteCourse
    );

    // Lessons
    this.router.post(
      "/lessons/:courseSlug/new",
      validateMiddleware({ params: courseSlugParamsSchema, body: createLessonSchema }),
      this.controller.createLesson
    );
    this.router.post(
      "/lessons/upload-video",
      validateFileHeadersMiddleware,
      this.controller.uploadVideo
    );
    this.router.get("/lessons/:courseSlug", this.controller.findManyLessons);
    // this.router.put(
    //   "/lessons/:courseSlug/:lessonId/update",
    //   validateMiddleware({ params: courseSlugParamsSchema, body: updateLessonSchema }),
    //   this.controller.updateLesson
    // );
    this.router.delete(
      "/lessons/:courseSlug/:lessonSlug/delete",
      validateMiddleware({ params: lessonSlugParamsSchema }),
      this.controller.deleteLesson
    );

    // Users
    this.router.get("/users", this.controller.findManyUsers);
    this.router.put(
      "/users/:userId/update",
      validateMiddleware({ params: userIdParamsSchema, body: updateUserSchema }),
      this.controller.updateUser
    );
    this.router.post(
      "/users/new",
      validateMiddleware({ body: adminCreateUserSchema }),
      this.controller.createUser
    );
    this.router.patch(
      "/users/:userId/toggle-active",
      validateMiddleware({ params: userIdParamsSchema }),
      this.controller.toggleUserStatus
    );
    this.router.delete(
      "/users/:userId/delete",
      validateMiddleware({ params: userIdParamsSchema }),
      this.controller.deleteUser
    );
  }

  get getRouter() {
    return this.router;
  }
}
