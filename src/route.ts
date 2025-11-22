import { Router } from "express";
import { DataBase } from "./db";
import { CourseRoutes } from "./features/course/course.route";
import { LessonRoutes } from "./features/lessons/lesson.route";
import { AuthRoutes } from "./features/auth/auth.routes";

export class MainRoutes {
  private readonly router: Router;
  private readonly courseRoutes: CourseRoutes;
  private readonly lessonRoutes: LessonRoutes;
  private readonly authRoutes: AuthRoutes;

  constructor(private readonly db: DataBase) {
    this.router = Router();
    this.courseRoutes = new CourseRoutes(this.db);
    this.lessonRoutes = new LessonRoutes(this.db);
    this.authRoutes = new AuthRoutes(this.db);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.use("/courses", this.courseRoutes.getRouter);
    this.router.use("/lessons/:courseSlug", this.lessonRoutes.getRouter);
    this.router.use("/auth", this.authRoutes.getRouter);
  }

  get getRouter() {
    return this.router;
  }
}
