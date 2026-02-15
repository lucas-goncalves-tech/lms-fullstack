import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { SessionsService } from "../sessions/sessions.service";
import { sidCookieOptions } from "../../shared/helper/sid-cookie-options.helper";
import { SID_IDENTIFIER } from "../../shared/constants/sid-identifier.constants";

export class AuthController {
  private readonly ttl: number;
  constructor(
    private readonly authService: AuthService,
    private readonly sessionsService: SessionsService
  ) {
    this.ttl = 60 * 60 * 24 * 15 * 1000;
  }

  createUser = async (req: Request, res: Response) => {
    const userData = req.body as CreateUserDto;
    await this.authService.createUser(userData);
    res.status(201).json({
      message: "usuário criado com sucesso!",
    });
  };

  loginUser = async (req: Request, res: Response) => {
    const userData = req.body as LoginUserDto;
    const userId = await this.authService.loginUser(userData);
    const sid = await this.sessionsService.createSession({
      userId,
      userAgent: req.headers["user-agent"] || "",
      ip: req.ip || "127.0.0.1",
    });
    res.cookie(SID_IDENTIFIER, sid, sidCookieOptions(this.ttl));
    res.status(204).end();
  };

  logoutUser = async (req: Request, res: Response) => {
    const sid = req.cookies[SID_IDENTIFIER]!;
    res.clearCookie(SID_IDENTIFIER, sidCookieOptions());

    await this.sessionsService.revokeSession(sid);

    res.status(204).end();
  };

  me = async (req: Request, res: Response) => {
    const { name, email, role } = req.session!;
    res.status(200).json({ name, email, role });
  };
}
