import { Router } from "express";
import { DataBase } from "./db";
import { CourseRoutes } from "./features/course/course.route";
import { LessonRoutes } from "./features/lessons/lesson.route";

export class MainRoutes {
  public router: Router;
  private courseRoutes: CourseRoutes;
  private lessonRoutes: LessonRoutes;
  constructor(private readonly db: DataBase) {
    this.router = Router();
    this.courseRoutes = new CourseRoutes(this.db);
    this.lessonRoutes = new LessonRoutes(this.db);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/health", (_req, res) => {
      res.json({ message: "Servidor está funcionando!" });
    });
    this.router.use("/courses", this.courseRoutes.router);
    this.router.use("/courses/:courseSlug", this.lessonRoutes.router);
  }
}
