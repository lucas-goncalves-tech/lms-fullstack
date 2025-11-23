import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error";

type RoleProps = "ADMIN" | "USER";

export class GuardRoleMiddleware {
  constructor() {}

  guard = (role: RoleProps[]) => (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.session?.role;
    if (!userRole || !role.includes(userRole)) {
      throw new UnauthorizedError("Usuário sem permissão");
    }
    next();
  };
}
