import { Router } from "express";
import { DataBase } from "../../db";
import { CourseController } from "./course.controller";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./course.service";
import { validateMiddleware } from "../../shared/middlewares/validate.middleware";
import { createCourseSchema } from "./dto/create-course.dto";

export class CourseRoutes {
  private controller: CourseController;
  public router: Router;
  constructor(private readonly db: DataBase) {
    const repository = new CourseRepository(this.db);
    const service = new CourseService(repository);
    this.controller = new CourseController(service);
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      "/",
      validateMiddleware({ body: createCourseSchema }),
      this.controller.createCourse
    );
  }
}
