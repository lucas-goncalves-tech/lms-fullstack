import { NextFunction, Request, Response } from "express";
import { ErrorBase } from "../errors/base.error";
import { SessionError } from "../errors/session.error";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof SessionError) {
    res.clearCookie("__Secure-sid", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
    return res.status(err.status).json({
      message: err.message,
    });
  }
  if (err instanceof ErrorBase) {
    return res.status(err.status).json({
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }
  console.error(err);

  return res.status(500).json({
    message: "Erro interno do servidor",
  });
}
