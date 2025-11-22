import { sql } from "drizzle-orm";
import { check } from "drizzle-orm/sqlite-core";
import { integer } from "drizzle-orm/sqlite-core";
import { text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./user.schema";

export const sessions = sqliteTable(
  "sessions",
  {
    sidHash: text("sid_hash").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: text("expires")
      .notNull()
      .default(sql`(STRFTIME('%s', 'NOW'))`),
    created: text("created").notNull(),
    ip: text("ip").notNull(),
    userAgent: text("user_agent").notNull(),
    revoked: integer("revoked").notNull().default(0),
  },
  (table) => [check("revoked_check", sql`${table.revoked} IN (0, 1)`)]
);
