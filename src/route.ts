import { Router } from "express";
import { DataBase } from "./db";
import { CourseRoutes } from "./features/course/course.route";
import { LessonRoutes } from "./features/lessons/lesson.route";
import { AuthRoutes } from "./features/auth/auth.routes";

export class MainRoutes {
  public router: Router;
  private courseRoutes: CourseRoutes;
  private lessonRoutes: LessonRoutes;
  private authRoutes: AuthRoutes;

  constructor(private readonly db: DataBase) {
    this.router = Router();
    this.courseRoutes = new CourseRoutes(this.db);
    this.lessonRoutes = new LessonRoutes(this.db);
    this.authRoutes = new AuthRoutes(this.db);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/health", (_req, res) => {
      res.json({ message: "Servidor está funcionando!" });
    });
    this.router.use("/courses", this.courseRoutes.getRouter());
    this.router.use("/lessons/:courseSlug", this.lessonRoutes.getRouter());
    this.router.use("/auth", this.authRoutes.getRouter());
  }
}
