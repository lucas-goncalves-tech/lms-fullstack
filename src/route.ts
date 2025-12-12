import { Router } from "express";
import { DataBase } from "./db";
import { CourseRoutes } from "./features/course/course.route";
import { LessonRoutes } from "./features/lessons/lesson.route";
import { AuthRoutes } from "./features/auth/auth.routes";
import { ValidateSessionMiddleware } from "./shared/middlewares/validate-session.middleware";
import { SessionsService } from "./features/sessions/sessions.service";
import { SessionsRepository } from "./features/sessions/sessions.repository";
import { UserRepository } from "./features/user/user.repository";
import { CryptoService } from "./shared/security/crypto-service.security";
import { CertificatesRoutes } from "./features/certificates/certificates.routes";
import { AdminRoutes } from "./features/admin/admin.routes";

export class MainRoutes {
  private readonly router: Router;
  private readonly courseRoutes: CourseRoutes;
  private readonly lessonRoutes: LessonRoutes;
  private readonly authRoutes: AuthRoutes;
  private readonly validateSessionMiddleware: ValidateSessionMiddleware;
  private readonly certificatesRoutes: CertificatesRoutes;
  private readonly adminRoutes: AdminRoutes;

  constructor(private readonly db: DataBase) {
    this.router = Router();

    const sessionsRepository = new SessionsRepository(this.db);
    const userRepository = new UserRepository(this.db);
    const cryptoService = new CryptoService();
    const sessionsService = new SessionsService(sessionsRepository, userRepository, cryptoService);
    this.validateSessionMiddleware = new ValidateSessionMiddleware(sessionsService);
    this.certificatesRoutes = new CertificatesRoutes(this.db);
    this.courseRoutes = new CourseRoutes(this.db);
    this.lessonRoutes = new LessonRoutes(this.db);
    this.adminRoutes = new AdminRoutes(this.db);
    this.authRoutes = new AuthRoutes(this.db);

    this.initRoutes();
  }

  private initRoutes() {
    this.router.use("/auth", this.authRoutes.getRouter);
    this.router.use(
      "/admin",
      this.validateSessionMiddleware.validateSession,
      this.adminRoutes.getRouter
    );
    this.router.use(
      "/courses",
      this.validateSessionMiddleware.validateSession,
      this.courseRoutes.getRouter
    );
    this.router.use(
      "/lessons/:courseSlug",
      this.validateSessionMiddleware.validateSession,
      this.lessonRoutes.getRouter
    );
    this.router.use(
      "/certificates",
      this.validateSessionMiddleware.validateSession,
      this.certificatesRoutes.getRouter
    );
  }

  get getRouter() {
    return this.router;
  }
}
