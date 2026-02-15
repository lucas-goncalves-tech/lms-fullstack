import { beforeAll, afterAll, beforeEach } from "vitest";
import { App } from "../app";
import supertest from "supertest";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "path";
import { certificates, courses, lessons, lessonsCompleted, sessions, users } from "../db/schema";

const appInstance = new App(":memory:");

export const app_tests = appInstance.app;
export const db_tests = appInstance.db;
export const req = supertest(app_tests);

beforeAll(() => {
  migrate(db_tests.connection, {
    migrationsFolder: path.join(__dirname, "../../drizzle"),
  });
});

beforeEach(async () => {
  const tables = [certificates, lessonsCompleted, lessons, courses, sessions, users];
  await Promise.all(tables.map((table) => db_tests.connection.delete(table)));
});

afterAll(() => {
  appInstance.db.close();
});
