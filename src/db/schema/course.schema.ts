import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { textCaseInsensitive } from "../custom-types";
import crypto from "crypto";

export const courses = sqliteTable("courses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: textCaseInsensitive("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  lessons: integer("lessons").notNull(),
  hours: integer("hours").notNull(),
  created: text("created")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
