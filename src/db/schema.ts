import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import crypto from "crypto";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().default(crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});
