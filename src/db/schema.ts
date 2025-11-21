import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import crypto from "crypto";

export const users = sqliteTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password_hash: text("password_hash").notNull(),
    role: text("role", { enum: ["USER", "ADMIN"] }).default("USER"),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  },
  (table) => [check("role_check", sql`${table.role} IN ('USER', 'ADMIN')`)]
);
