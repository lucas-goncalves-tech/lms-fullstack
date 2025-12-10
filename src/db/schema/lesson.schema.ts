import { sqliteTable, text, integer, index, check, uniqueIndex } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { textCaseInsensitive } from "../custom-types";
import { courses } from "./course.schema";
import crypto from "crypto";

export const lessons = sqliteTable(
  "lessons",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    courseId: text("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    slug: textCaseInsensitive("slug").notNull(),
    title: text("title").notNull(),
    seconds: integer("seconds").notNull(),
    video: text("video").notNull(),
    description: text("description").notNull(),
    order: integer("order").notNull(),
    free: integer("free").notNull().default(0),
    created: text("created")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    check("free_check", sql`${table.free} IN (0, 1)`),
    uniqueIndex("unique_course_slug").on(table.courseId, table.slug),
    index("idx_lessons_order").on(table.courseId, table.order),
  ]
);
