import express from "express";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { DataBase } from "./db";
import { MainRoutes } from "./route";
import { NotfoundError } from "./shared/errors/not-found.error";
import path from "node:path";

class App {
  public app: express.Express;
  private db: DataBase;
  constructor() {
    this.app = express();
    this.db = new DataBase();
    this.init();
  }

  private middlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    this.app.get("/web", (req, res) => {
      res.sendFile(path.join(__dirname, "../web/index.html"));
    });
    this.app.use("/api/v1", new MainRoutes(this.db).getRouter);
    this.app.use((_req, _res, next) => {
      next(new NotfoundError("Endpoint não encontrado"));
    });
  }

  private handlers() {
    this.app.use(errorHandler);
  }

  private init() {
    this.middlewares();
    this.routes();
    this.handlers();
  }
}

export { App };
