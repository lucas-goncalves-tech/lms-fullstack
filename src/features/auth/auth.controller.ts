import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  createUser = async (req: Request, res: Response) => {
    const userData = req.body as CreateUserDto;
    const newUser = await this.authService.createUser(userData);
    return res.status(201).json(newUser);
  };
}
