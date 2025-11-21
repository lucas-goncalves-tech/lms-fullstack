import { sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { users } from "./user.schema";
import { courses } from "./course.schema";
import { lessons } from "./lesson.schema";

export const lessonsCompleted = sqliteTable(
  "lessons_completed",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseId: text("course_id")
      .notNull()
      .references(() => courses.id),
    lessonId: text("lesson_id")
      .notNull()
      .references(() => lessons.id),
    completed: text("completed")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [primaryKey({ columns: [table.userId, table.courseId, table.lessonId] })]
);
