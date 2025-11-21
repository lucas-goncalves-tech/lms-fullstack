import express from "express";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { NotfoundError } from "./shared/errors/not-found.error";

class App {
  app: express.Express;
  constructor() {
    this.app = express();
    this.init();
  }

  private middlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    this.app.get("/", (req, res) => {
      res.json({ message: "Hello from Express!" });
    });
  }

  private handlers() {
    this.app.use((req, res, next) => {
      next(new NotfoundError("Endpoint não encontrado"));
    });
    this.app.use(errorHandler);
  }

  public init() {
    this.middlewares();
    this.routes();
    this.handlers();
  }
}

export default new App().app;
