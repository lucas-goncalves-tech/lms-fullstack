import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  createUser = async (req: Request, res: Response) => {
    const userData = req.body as CreateUserDto;
    const newUser = await this.authService.createUser(userData);
    res.status(201).json(newUser);
  };

  loginUser = async (req: Request, res: Response) => {
    const userData = req.body as LoginUserDto;
    await this.authService.loginUser(userData);
    res.status(204).end();
  };
}
