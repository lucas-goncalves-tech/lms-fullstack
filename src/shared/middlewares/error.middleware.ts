import { NextFunction, Request, Response } from "express";
import { ErrorBase } from "../errors/base.error";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(err.stack);
  if (err instanceof ErrorBase) {
    res.status(err.status).json({
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  res.status(500).json({
    message: "Erro interno do servidor",
  });
}
