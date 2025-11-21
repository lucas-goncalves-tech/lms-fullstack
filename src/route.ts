import { Router } from "express";
import { DataBase } from "./db";

export class MainRoutes {
  public router: Router;
  constructor(private readonly db: DataBase) {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/health", (_req, res) => {
      res.json({ message: "Servidor está funcionando!" });
    });
  }
}
