import app from "./app.ts";
import { envCheck } from "./shared/helper/env-check.ts";

class Server {
  private PORT: string;
  private app: typeof app;
  constructor() {
    this.PORT = envCheck().PORT;
    this.app = app;
    this.init();
  }

  private init() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on http://localhost:${this.PORT}`);
    });
  }
}

new Server();
