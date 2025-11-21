import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import DatabaseDriver from "better-sqlite3";
import * as schema from "./schema";
import { envCheck } from "../shared/helper/env-check";

export class DataBase {
  public connection: BetterSQLite3Database<typeof schema>;
  constructor() {
    const sqlite = new DatabaseDriver(envCheck().DB_FILE_NAME);
    this.connection = drizzle(sqlite, { schema });
  }
}
