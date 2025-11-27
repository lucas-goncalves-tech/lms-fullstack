import { App } from "./app.ts";
import { envCheck } from "./shared/helper/env-check.helper.ts";

class Server {
  private readonly PORT = envCheck().PORT;
  private readonly app = new App().app;
  constructor() {
    this.init();
  }

  private init() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on http://localhost:${this.PORT}`);
    });
  }
}

new Server();
