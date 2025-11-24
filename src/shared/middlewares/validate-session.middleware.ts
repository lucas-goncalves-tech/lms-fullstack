import { NextFunction, Request, Response } from "express";
import { SessionsService } from "../../features/sessions/sessions.service";
import { UnauthorizedError } from "../errors/unauthorized.error";

export class ValidateSessionMiddleware {
  constructor(private readonly sessionsService: SessionsService) {}

  validateSession = async (req: Request, res: Response, next: NextFunction) => {
    const sid = req.cookies["__Secure-sid"];
    if (!sid) throw new UnauthorizedError("Sessão inválida");
    try {
      const session = await this.sessionsService.validateSession(sid);
      req.session = {
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
      };
      if (session.renewed) {
        res.cookie("__Secure-sid", sid, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          path: "/",
          maxAge: session.expires_ms,
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
