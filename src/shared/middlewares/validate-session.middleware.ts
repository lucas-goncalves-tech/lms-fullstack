import { NextFunction, Request, Response } from "express";
import { SessionsService } from "../../features/sessions/sessions.service";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { sidCookieOptions } from "../helper/sid-cookie-options.helper";
import { SID_IDENTIFIER } from "../constants/sid-identifier.constants";

export class ValidateSessionMiddleware {
  constructor(private readonly sessionsService: SessionsService) {}

  validateSession = async (req: Request, res: Response, next: NextFunction) => {
    const sid = req.cookies[SID_IDENTIFIER];
    if (!sid) throw new UnauthorizedError("Sessão inválida");
    try {
      const session = await this.sessionsService.validateSession(sid);
      req.session = {
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
      };
      if (session.renewed) {
        res.cookie(SID_IDENTIFIER, sid, sidCookieOptions(session.expires_ms));
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
