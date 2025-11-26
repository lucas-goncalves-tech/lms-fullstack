import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { SessionsService } from "../sessions/sessions.service";
import { UpdatePasswordDto } from "./dto/update-password.dto";

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
    const newUser = await this.authService.createUser(userData);
    res.status(201).json(newUser);
  };

  loginUser = async (req: Request, res: Response) => {
    const userData = req.body as LoginUserDto;
    const userId = await this.authService.loginUser(userData);
    const sid = await this.sessionsService.createSession({
      userId,
      userAgent: req.headers["user-agent"] || "",
      ip: req.ip || "127.0.0.1",
    });
    res.cookie("__Secure-sid", sid, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: this.ttl,
    });
    res.status(204).end();
  };

  logoutUser = async (req: Request, res: Response) => {
    const sid = req.cookies["__Secure-sid"]!;
    res.clearCookie("__Secure-sid");

    await this.sessionsService.revokeSession(sid);

    res.status(204).end();
  };

  me = async (req: Request, res: Response) => {
    const { name, email, role } = req.session!;
    res.status(200).json({ name, email, role });
  };

  updatePassword = async (req: Request, res: Response) => {
    const updatePasswordData = req.body as UpdatePasswordDto;
    const { userId } = req.session!;
    await this.authService.updatePassword(userId, updatePasswordData);
    await this.sessionsService.revokeAllUserSessions(userId);
    const sid = await this.sessionsService.createSession({
      userId,
      userAgent: req.headers["user-agent"] || "",
      ip: req.ip || "127.0.0.1",
    });
    res.cookie("__Secure-sid", sid, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: this.ttl,
    });
    res.status(204).end();
  };
}
