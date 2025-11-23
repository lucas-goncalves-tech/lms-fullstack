import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { SessionsService } from "../sessions/sessions.service";

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionsService: SessionsService
  ) {}

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
      maxAge: 60 * 60 * 24 * 15 * 1000,
    });
    res.status(204).end();
  };
}
