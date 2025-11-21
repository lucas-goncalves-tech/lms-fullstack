import { App } from "./app.ts";
import { envCheck } from "./shared/helper/env-check.ts";
import type { Express } from "express";

class Server {
  private PORT: string;
  private app: Express;
  constructor() {
    this.PORT = envCheck().PORT;
    this.app = new App().app;
    this.init();
  }

  private init() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on http://localhost:${this.PORT}`);
    });
  }
}

new Server();
