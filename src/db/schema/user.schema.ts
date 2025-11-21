import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import crypto from "crypto";
import { textCaseInsensitive } from "../custom-types";

export const users = sqliteTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: textCaseInsensitive("email").notNull().unique(),
    password_hash: text("password_hash").notNull(),
    role: text("role", { enum: ["USER", "ADMIN"] })
      .default("USER")
      .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  },
  (table) => [check("role_check", sql`${table.role} IN ('USER', 'ADMIN')`)]
);
