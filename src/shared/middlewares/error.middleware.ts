import { NextFunction, Request, Response } from "express";
import { ErrorBase } from "../errors/base.error";
import { SessionError } from "../errors/session.error";
import { SID_IDENTIFIER } from "../constants/sid-identifier.constants";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof SessionError) {
    res.clearCookie(SID_IDENTIFIER);
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
