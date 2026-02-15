import { Request, Response } from "express";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { UserService } from "./user.service";
import { SessionsService } from "../sessions/sessions.service";
import { SID_IDENTIFIER } from "../../shared/constants/sid-identifier.constants";
import { sidCookieOptions } from "../../shared/helper/sid-cookie-options.helper";
import { UpdateEmailDTO } from "./dto/update-email.dto";

export class UserController {
  private readonly ttl: number;
  constructor(
    private readonly userService: UserService,
    private readonly sessionsService: SessionsService
  ) {
    this.ttl = 60 * 60 * 24 * 15 * 1000;
  }

  updatePassword = async (req: Request, res: Response) => {
    const updatePasswordData = req.body as UpdatePasswordDto;
    const { userId } = req.session!;
    await this.userService.updatePassword(userId, updatePasswordData);
    await this.sessionsService.revokeAllUserSessions(userId);
    const sid = await this.sessionsService.createSession({
      userId,
      userAgent: req.headers["user-agent"] || "",
      ip: req.ip || "127.0.0.1",
    });
    res.cookie(SID_IDENTIFIER, sid, sidCookieOptions(this.ttl));
    res.status(204).end();
  };

  updateEmail = async (req: Request, res: Response) => {
    const { email } = req.body as UpdateEmailDTO;
    const { userId } = req.session!;
    await this.userService.updateEmail(userId, email);
    res.status(204).end();
  };
}
